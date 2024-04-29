import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registroestudiante',
  templateUrl: './registroestudiante.page.html',
  styleUrls: ['./registroestudiante.page.scss'],
})
export class RegistroestudiantePage implements OnInit {
  formularioEstudiante: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formularioEstudiante = this.formBuilder.group({
      NombreEst: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoEst: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      curso_idCurso: ['', [Validators.required, Validators.pattern(/^\d[A-Z]$/)]],
    });
  }

  ngOnInit() {}

  registrarEstudiante() {
    if (this.formularioEstudiante.valid) {
      const token = localStorage.getItem('token');
      // Incluir el token en el objeto de datos
      const datosRegistro = {
        ...this.formularioEstudiante.value,
        token,  // Incluye el token obtenido del localStorage
      };

      this.authService.registerEstudiante(datosRegistro).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          alert('Registro Exitoso');
          this.router.navigate(['/paguinaprincipalrepresentante']);
        },
        error: (error) => {
          console.error('Error en el registro', error);
          let mensajeError = 'Ocurrió un error al intentar registrar. Por favor, intenta de nuevo.';
          if (error.error && error.error.message) {
            mensajeError = error.error.message; // Utilizar el mensaje proporcionado por la API
          }
          alert(mensajeError);
        },
      });
    } else {
      alert('Por favor, rellena todos los campos requeridos.');
    }
  }
}
