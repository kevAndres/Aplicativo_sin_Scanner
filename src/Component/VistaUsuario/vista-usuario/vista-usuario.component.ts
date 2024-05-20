import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../app/services/getProfile/profile.service'; // Ajusta la ruta según la ubicación de tu servicio
import { ModalController } from '@ionic/angular'; // Importar ModalController

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.scss'],
})
export class VistaUsuarioComponent implements OnInit {
  userInfo: any = null;
  QR: string = ''; // Inicializa como una cadena vacía para almacenar el QR

  constructor(private ProfileService: ProfileService,
    private modalController: ModalController
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


  ShowQR() {
    this.ProfileService.getQR().subscribe(
      data => {
        console.log('QR Realizado:', data); // Verificar los datos recibidos
        this.QR = data.qrCodeDataURL;

        
        // Crear un enlace de descarga y activarlo
        const link = document.createElement('a');
        link.href = this.QR;
        link.download = 'QR de Estudiante.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error => {
        console.error('Error al Generar el QR', error);
      }
    );
  }
}
