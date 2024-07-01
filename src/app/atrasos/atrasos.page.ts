import { Component, OnDestroy, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from '../services/getestudiantes/estudiantes.service';
import { MenuController } from '@ionic/angular';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface Docente {
  asignatura_idasignatura: string;
  curso_idCurso: string;
  IdAsignacion: string;
}
@Component({
  selector: 'app-atrasos',
  templateUrl: './atrasos.page.html',
  styleUrls: ['./atrasos.page.scss'],
})
export class AtrasosPage implements OnInit {
  formularioatrasos: FormGroup;
  username: string = '';
  cursos: any[] = [];
  Estudiantes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private EstudiantesService: EstudiantesService,
    private menu: MenuController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.formularioatrasos = this.formBuilder.group({
      descripcion: [''],
      curso_idCurso: ['', [Validators.required]],
      EstudianteCurso: ['', [Validators.required]],
    });
  }

  //Alerta de ERROR
  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  //Alerta de Confirmacion
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

  ngOnInit() {}

  //Iniciador de Componentes de la Paguina
  ionViewDidEnter() {
    this.UserName();
    this.loadCursos();
  }
  ionViewWillEnter() {
    this.UserName();
    this.loadCursos();

    this.menu.enable(false, 'first');
  }

  registrarAtraso() {
    if (this.formularioatrasos.valid) {
      const descripcion = this.formularioatrasos.get('descripcion')!.value;
      this.authService.RegisterAtrasos({ descripcion }).subscribe({
        next: (response) => {
          // Manejo de la respuesta exitosa
          console.log('Atrasos registrado exitosamente', response);
          this.presentConfirmacion('Atraso registrado exitosamente');
        },
        error: (error) => {
          console.error('Error en el registro', error);
          let mensajeError = 'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
          if (error.error && error.error.message) {
            mensajeError = error.error.message;
          }
          this.presentError(mensajeError);
        },
      });
    }
  }
  //Obtiene todos los cursos del establecimiento
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

  //Obtiene el Usuario en el que esta logueado
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }

  GetDataAsignaturaCurso(event: any) {
    const cursoId = event.detail.value;
    localStorage.setItem('curso', cursoId);
    console.log(localStorage.getItem('curso'));

    // Llamar al método para cargar estudiantes del curso seleccionado
    this.loadEstudiantesCurso();
  }

  loadEstudiantesCurso() {
    this.EstudiantesService.getEstudiantesCurso().subscribe({
      next: (data) => {
        this.Estudiantes = data;
        // Aquí puedes llamar a GetDataIdEstudiante después de cargar los estudiantes, si es necesario
        if (this.Estudiantes.length > 0) {
          this.GetDataIdEstudiante(this.Estudiantes[0]);
        }
      },
      error: (Error) => {
        console.error('Error al cargar los estudiantes', Error);
      },
    });
  }

  GetDataIdEstudiante(estudiante: any) {
    localStorage.setItem('Estudiante', estudiante.idEstudiantes);
    console.log(estudiante.idEstudiantes);
  }
}
