import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrorepresentantes',
  templateUrl: './registrorepresentantes.page.html',
  styleUrls: ['./registrorepresentantes.page.scss'],
})
export class RegistrorepresentantesPage implements OnInit {
  formularioRepresentantes: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.formularioRepresentantes = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  registrarRepresentante() {
    if (this.formularioRepresentantes.valid) {
      // Construye el objeto de datos con la información del formulario
      const datosRegistro = {
        nombre: this.formularioRepresentantes.value.nombre,
        apellido: this.formularioRepresentantes.value.apellido,
        cedula: this.formularioRepresentantes.value.cedula,
        email: this.formularioRepresentantes.value.email,
        password: this.formularioRepresentantes.value.password,
        // Aquí añades el rol que siempre será 'representante'
        rol: 'representante',
      };

      // Llama al método register del servicio authService y pasa los datos
      this.authService.registerRepresentante(datosRegistro).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          alert('Registro Exitoso');
          // Navega a la ruta que desees tras un registro exitoso, por ejemplo '/login'
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error en el registro', error);
          let mensajeError = 'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
          if (error.error && error.error.message) {
            mensajeError = error.error.message; // Usa el mensaje de la respuesta
          }
          alert(mensajeError)
        },
      });
    }
  }
}
