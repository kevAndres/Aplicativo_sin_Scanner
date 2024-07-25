import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../app/services/getProfile/profile.service'; // Ajusta la ruta según la ubicación de tu servicio
import { ModalController } from '@ionic/angular'; // Importar ModalController
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

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

  async ShowQR() {
    this.ProfileService.getQR().subscribe(
      async data => {
        console.log('QR Realizado:', data); // Verificar los datos recibidos
        this.QR = data.qrCodeDataURL;

        try {
          // Convertir dataURL a Blob
          const response = await fetch(this.QR);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64data = reader.result?.toString().split(',')[1];
            if (base64data) {
              await Filesystem.writeFile({
                path: 'QR_de_Estudiante.jpg',
                data: base64data,
                directory: Directory.Documents,
                encoding: Encoding.UTF8,
              });
              console.log('Archivo guardado correctamente');
              alert('Archivo guardado correctamente en la carpeta de documentos');
            }
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error('Error al guardar el archivo', error);
          alert('Error al guardar el archivo: ' + error);
        }
      },
      error => {
        console.error('Error al Generar el QR', error);
      }
    );
  }
}
