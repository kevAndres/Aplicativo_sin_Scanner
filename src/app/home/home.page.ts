import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { AlertController } from '@ionic/angular';

interface JwtPayload {
  nombre?: string;
  idRol?: string;
  // ... cualquier otra propiedad que esperes en tu token
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;

  ngOnInit() {

  }
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Añade esta función para presentar alertas
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            if (response.token) {
              localStorage.setItem('token', response.token); // Guarda el token y la información del usuario como sea necesario
              console.log('Token recibido:', response.token);
              const decodedToken = jwtDecode<JwtPayload>(response.token);
              const idRolPrefix = decodedToken.idRol?.substring(0, 3); // Obtén las primeras tres letras
              //console.log('Token decodificado:', idRolPrefix);
              if (decodedToken && decodedToken.idRol) {
                switch (idRolPrefix) {
                  case 'REP':
                    this.router.navigate(['/paguinaprincipalrepresentante']);
                    console.log('Login :', response.message);
                    //alert('Login Existoso');
                    
                    break;
                  case 'LIC':
                    this.router.navigate(['/paguinainicial']);
                    console.log('Login :', response.message);
                    //alert('Login Existoso');
                    break;
                  case 'INS':
                    this.router.navigate(['/ruta-para-inspector']);
                    console.log('Login :', response.message);
                    //alert('Login Existoso');
                    break;
                  default:
                    this.router.navigate(['/home']); // Ruta por defecto o manejo de error
                    break;
                }
              } else {
                console.error('El token no contiene la propiedad esperada.');
                this.presentAlert('El token no contiene la información necesaria.');
              }
            } else {
              console.error('No se recibio token en la respuesta');
              this.presentAlert('No se recibio token en la respuesta');
            }
          },
          error: (error) => {
            console.error('Error en el login', error);
            const mensajeError =
              error.error && error.error.message
                ? error.error.message
                : 'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
                this.presentAlert(mensajeError);

          },
        });
    }
  }

  goToRegistroDocentes() {
    this.router.navigateByUrl('/registrodocentes'); // Asegúrate de que esta ruta está definida en tus rutas
  }
  goToRegistroRepresentantes() {
    this.router.navigateByUrl('/registrorepresentantes'); // Asegúrate de que esta ruta está definida en tus rutas
  }
}
