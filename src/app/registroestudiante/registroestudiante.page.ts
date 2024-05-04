import { Component, OnDestroy, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { EstudiantesService } from '../services/getestudiantes/estudiantes.service';

@Component({
  selector: 'app-registroestudiante',
  templateUrl: './registroestudiante.page.html',
  styleUrls: ['./registroestudiante.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class RegistroestudiantePage implements OnInit {
  formularioEstudiante: FormGroup;
  representados: any[] = [];
  username: string = '';
  cursos: any[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private EstudiantesService: EstudiantesService,
    private routerOutlet: IonRouterOutlet // Necesario para Ionic
  ) {
    this.formularioEstudiante = this.formBuilder.group({
      NombreEst: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoEst: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      curso_idCurso: ['', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

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
    this.loadCursos();

  }
  ionViewWillEnter() {
    this.UserName();
    this.loadCursos();
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
  registrarEstudiante() {
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
  }

  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
}
