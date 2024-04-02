import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrodocentes',
  templateUrl: './registrodocentes.page.html',
  styleUrls: ['./registrodocentes.page.scss'],
})
export class RegistrodocentesPage {
  formularioDocente: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Aquí inicializamos el FormGroup utilizando el FormBuilder
    this.formularioDocente = this.formBuilder.group({
      // Definimos un FormControl para cada campo con sus validaciones
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Suponiendo cédula de 10 dígitos
      correo: ['', [Validators.required, Validators.email]],
      asignatura: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  // Este método se llamará cuando el formulario se intente enviar
  registrarDocente() {
    // Verificamos si el formulario es válido
    if (this.formularioDocente.valid) {
      // Si el formulario es válido, podemos proceder a registrar al docente
      console.log('Datos del formulario:', this.formularioDocente.value);
      // Aquí podrías añadir la lógica para enviar estos datos a un servidor o base de datos
    } else {
      // Si el formulario no es válido, podemos mostrar algún mensaje de error
      console.error('El formulario tiene errores y no se puede registrar al docente');
    }
  }
}
