import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { EstudiantesService } from '../services/getestudiantes/estudiantes.service';
import { AlertController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-registroasignatura',
  templateUrl: './registroasignatura.page.html',
  styleUrls: ['./registroasignatura.page.scss'],
})
export class RegistroasignaturaPage implements OnInit {
  asignaturas: any[] = [];
  cursos: any[] = [];
  asignaturasdocente: any[] = [];

  selectedAsignatura?: string;
  username: string = '';
  formularioAsignatura: FormGroup;

  constructor(
    private EstudiantesService: EstudiantesService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private AuthService : AuthService,
    private router: Router

  ) {
    this.formularioAsignatura = this.formBuilder.group({
      asignatura_idasignatura: ['', [Validators.required]],
      curso_idCurso: ['', [Validators.required]]
    });
  }
  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {}
  async presentConfirmacion(message: string) {
    const alert = await this.alertController.create({
      header: 'INFO',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  
  ionViewDidEnter() {
    this.UserName();
    this.loadAsignaturas();
    this.loadCursos();
  }
  ionViewWillEnter() {
    this.UserName();
    this.loadAsignaturas();
    this.loadCursos();
  
  }
  loadAsignaturas() {
    this.EstudiantesService.getAsignaturas().subscribe({
      next: (data) => {
        this.asignaturas = data;
        console.log(this.asignaturas);
      },
      error: (error) => {
        console.error('Error al cargar las asignaturas', error);
      },
    });
  }
  loadCursos() {
    this.EstudiantesService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data;
      },
      error: (error) => {
        console.error('Error al cargar cursos', error);
      },
    });
  }
  RegisterAsignatura(){
if(this.formularioAsignatura.valid){
  this.AuthService.registerAsignatura(this.formularioAsignatura.value).subscribe({
    next:(Response) =>{
      console.log(Response.message);
      this.presentConfirmacion(Response.message);
      this.router.navigate(['/paguinainicial']);
    },
    error:(Error) =>{
      console.error('Error en el registro', Error);
      let mensajeError =
        'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
      if (Error.error && Error.error.message) {
        mensajeError = Error.error.message;
      }
      this.presentError(mensajeError);
    }
  })

}
  }
  ChargeAsignacionAignaturas(){
    this.EstudiantesService.getAsignaturasDocente().subscribe(
      data => {
        this.asignaturasdocente = data;
      },
      Error => {
        console.error('Error al cargar las asignaciones  de asignaturas del docente', Error)
      }
    )
  }
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
}
