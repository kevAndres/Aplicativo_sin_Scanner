import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrodocentes',
  templateUrl: './registrodocentes.page.html',
  styleUrls: ['./registrodocentes.page.scss'],
})
export class RegistrodocentesPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Datos del formulario enviados');
    // Aquí iría tu lógica para manejar los datos del formulario
  }

}
