import { Component, OnInit } from '@angular/core';
import { EsquelasService } from '../../../app/services/getEsquelas/esquelas.service';
import { EstudiantesService } from 'src/app/services/getestudiantes/estudiantes.service';
import { AuthService } from '../../../app/services/auth.service';
import { ModalController } from '@ionic/angular';

import { FullscreenImageModalComponent } from '../../../Component/VistaEvidenciaFull/fullscreen-image-modal/fullscreen-image-modal.component';

interface Esquela {
  motivo: string;
  fechaEnvio: string;
  descripcion: string;
  evidencia: string;
  detailsVisible: boolean;
}


@Component({
  selector: 'app-vista-esquela',
  templateUrl: './vista-esquela.component.html',
  styleUrls: ['./vista-esquela.component.scss'],
})
export class VistaEsquelaComponent implements OnInit {
  esquelas: any[] = [];
  username: string = '';
  Nombreestudiante: string ;
  Apellidosestudiante: string ;
  detailsVisible = false;

  constructor(private esquelasService: EsquelasService,
    private EstudiantesService: EstudiantesService,
    private authService : AuthService,
    private modalController: ModalController
  ) {
    this.Nombreestudiante='';
    this.Apellidosestudiante='';

  }

  ngOnInit() {   
    this.authService.AutentificatorLogin();

    this.Nombreestudiante = localStorage.getItem('NombreEstudiante') || 'Nombre';
    this.Apellidosestudiante = localStorage.getItem('ApellidoEstudiante') || 'Apellido';
    this.getEsquelas();
    this.getRepresentante();

  }

  getEsquelas() {
    this.esquelasService.getEsquelasIdEstudiante().subscribe(
      (data: any[]) => {
        this.esquelas = data.map(item => ({
          ...item,
          detailsVisible: false  // Añadimos la propiedad detailsVisible
        }));
        console.log(this.esquelas);
      },
      (error) => {
        console.error('Error al obtener las esquelas:', error);
      }
    );
  }
getRepresentante(){
  try {
    this.username = this.EstudiantesService.getUsername();
  } catch (error) {
    console.error(error);
  }
}

toggleDetails(selectedEsquela: Esquela) {
  this.esquelas.forEach(esquela => {
    esquela.detailsVisible = (esquela === selectedEsquela) ? !esquela.detailsVisible : false;
  });
}
async openFullscreenImage(image: string) {
  const modal = await this.modalController.create({
    component: FullscreenImageModalComponent,
    componentProps: { image }
  });
  
  return await modal.present();
}
}
