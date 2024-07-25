import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { EstudiantesService } from '../../../app/services/getestudiantes/estudiantes.service';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.scss'],
})
export class ScannerQRComponent implements OnDestroy {
  qrCodeData: string | null = null;
  estudiantes_idEstudiantes: string | null = null;

  constructor(
    private estudiantesService: EstudiantesService,
    private alertController: AlertController
  ) {}

  async startScan() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        await BarcodeScanner.hideBackground(); // make background of WebView transparent
        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
        if (result.hasContent) {
          this.qrCodeData = result.content; // result content
          this.getEstudianteData(result.content); // Obtener datos del estudiante
          await BarcodeScanner.showBackground();
        }
      } else {
        console.error('No permissions granted!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getEstudianteData(codigo: string) {
    try {
      const estudiante = await this.estudiantesService.getEstudianteData(codigo).toPromise();
      this.estudiantes_idEstudiantes = estudiante.idEstudiantes; // Almacena el id del estudiante
      this.presentAlert(estudiante.NombreEst, estudiante.ApellidoEst, estudiante.cedula);
    } catch (error) {
      console.error('Error al obtener los datos del estudiante', error);
      alert('Error al obtener los datos del estudiante: ' + error);
    }
  }

  async presentAlert(nombre: string, apellido: string, cedula: string) {
    const alert = await this.alertController.create({
      header: 'Registrar Atraso',
      message: `Registrar Atraso al estudiante ${nombre} ${apellido} con cédula ${cedula}.`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (this.estudiantes_idEstudiantes) {
              this.registrarAtraso(this.estudiantes_idEstudiantes);
            } else {
              console.error('No se encontró el id del estudiante');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  registrarAtraso(estudiantes_idEstudiantes: string) {
    this.estudiantesService.registrarAtraso(estudiantes_idEstudiantes).subscribe({
      next: (response) => {
        console.log('Atraso registrado exitosamente', response);
        this.presentConfirmacion('Atraso registrado exitosamente');
        this.qrCodeData = null; // Reiniciar el valor del código QR para permitir un nuevo escaneo
      },
      error: (error) => {
        console.error('Error al registrar el atraso', error);
        this.presentError('Error al registrar el atraso');
        this.qrCodeData = null; // Reiniciar el valor del código QR para permitir un nuevo escaneo
      }
    });
  }

  async presentConfirmacion(message: string) {
    const alert = await this.alertController.create({
      header: 'INFO',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnDestroy() {
    BarcodeScanner.showBackground();
  }
}
