import { Component, OnDestroy, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from '../services/getestudiantes/estudiantes.service';
import { MenuController } from '@ionic/angular';
import { AlertController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-atrasos',
  templateUrl: './atrasos.page.html',
  styleUrls: ['./atrasos.page.scss'],
})
export class AtrasosPage implements OnInit {
  formularioatrasos: FormGroup;
  username: string = '';
  cursos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private EstudiantesService: EstudiantesService,
    private menu: MenuController,
    private alertController: AlertController
  ) {
    this.formularioatrasos = this.formBuilder.group({
      NombreEst: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoEst: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      curso_idCurso: ['', [Validators.required]],
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
  }
  ionViewWillEnter() {
    this.UserName();
    this.menu.enable(false, 'first');
  }

  /*registrarEstudiante() {
    if (this.formularioEstudiante.valid) {
      // Llama al método register del AuthService y pasa los datos del formulario
      this.authService
        .registerEstudiante(this.formularioEstudiante.value)
        .subscribe({
          next: (response) => {
            // Manejo de la respuesta exitosa
            console.log('Estudiante registrado exitosamente', response);
            this.router.navigate(['/paguinaprincipalrepresentante']); // Navegar de regreso
          },
          error: (error) => {
            console.error('Error en el registro', error);
            let mensajeError =
              'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
            if (error.error && error.error.message) {
              mensajeError = error.error.message;
            }
            this.presentError(mensajeError);
          },
        });
    }
  }*/
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
}
