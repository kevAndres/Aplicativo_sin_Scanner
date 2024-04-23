import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;

  ngOnInit(): void {}
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      email: this.loginForm.value.email;
      password: this.loginForm.value.password;

      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            console.log('Login exitoso', response);
            // Guarda el token y la información del usuario como sea necesario
            //localStorage.setItem('token', response.token);
            // Aquí podrías guardar también la información del usuario si es necesaria
            this.router.navigate(['/paguinainicial']); // Navega a la ruta de dashboard o la que corresponda
          },
          error: (error) => {
            console.error('Error en el login', error);
            let mensajeError =
              'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
            if (error.error && error.error.message) {
              mensajeError = 'Crendenciales Incorrectas'; // Usa el mensaje de la respuesta
            }
            alert(mensajeError);
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
