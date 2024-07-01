import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';  
import jsQR from 'jsqr';
import { EstudiantesService } from '../../../app/services/getestudiantes/estudiantes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrls: ['./scanner-qr.component.scss'],
})
export class ScannerQRComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  qrCodeData: string | null = null;
  videoStream: MediaStream | null = null;  // Variable para almacenar el stream de video
  estudiantes_idEstudiantes: string | null = null;     // Variable para almacenar el id del estudiante

  constructor(
    private router: Router,
    private estudiantesService: EstudiantesService,
    private alertController: AlertController
  ) {}

  ngAfterViewInit() {
    this.startVideo();
  }

  async startVideo() {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
        },
      };

      this.videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = this.videoElement.nativeElement;

      if (video) {
        video.srcObject = this.videoStream;
        video.setAttribute('playsinline', ''); 

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => {
            resolve(video.play());
          };
          video.onerror = (error) => {
            reject(error);
          };
        });

        this.scanQRCode();
      }
    } catch (error) {
      console.error('Error accessing the camera: ', error);
      alert('Error accessing the camera: ' + error);
    }
  }

  scanQRCode() {
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    const video = this.videoElement.nativeElement;

    const tick = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA && context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          this.qrCodeData = code.data;
          this.getEstudianteData(code.data);  // Obtener datos del estudiante
        }
      }

      if (!this.qrCodeData) {
        requestAnimationFrame(tick);
      }
    };

    tick();
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
        this.qrCodeData = null;  // Reiniciar el valor del código QR para permitir un nuevo escaneo
        this.scanQRCode();  // Reiniciar el escaneo después del registro
      },
      error: (error) => {
        console.error('Error al registrar el atraso', error);
        this.presentError('Error al registrar el atraso');
        this.qrCodeData = null;  // Reiniciar el valor del código QR para permitir un nuevo escaneo
        this.scanQRCode();  // Reiniciar el escaneo después del registro
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
    this.stopVideo();  // Detener el video cuando el componente se destruya
  }

  stopVideo() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
    }
  }
}
