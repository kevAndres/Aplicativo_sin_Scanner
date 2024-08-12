import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../app/services/getProfile/profile.service'; // Ajusta la ruta según la ubicación de tu servicio
import { ModalController, AlertController } from '@ionic/angular'; // Importar ModalController y AlertController
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.scss'],
})
export class VistaUsuarioComponent implements OnInit {
  userInfo: any = null;
  QR: string = ''; // Inicializa como una cadena vacía para almacenar el QR

  constructor(
    private ProfileService: ProfileService,
    private modalController: ModalController,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  ngOnInit() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.ProfileService.getUsuario().subscribe(
      data => {
        console.log('Datos recibidos:', data); // Verificar los datos recibidos
        this.userInfo = data;
      },
      error => {
        console.error('Error al obtener la información del usuario', error);
      }
    );
  }

  close() {
    this.modalController.dismiss(); // Cierra el modal
  }

  async ShowQR() {


    this.ProfileService.getQR().subscribe(
      async data => {
        console.log('QR Realizado:', data); // Verificar los datos recibidos
        this.QR = data.qrCodeDataURL;


      },
      error => {
        console.error('Error al Generar el QR', error);
        this.presentAlert('Error al Generar el QR: ' + error);
      }
    );
  }



  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
