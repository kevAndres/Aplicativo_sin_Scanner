import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paguinaprincipalrepresentante',
  templateUrl: './paguinaprincipalrepresentante.page.html',
  styleUrls: ['./paguinaprincipalrepresentante.page.scss'],
})
export class PaguinaprincipalrepresentantePage implements OnInit {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Acerca de', url: '/about', icon: 'information-circle' },
    { title: 'Contacto', url: '/contact', icon: 'call' },
    // ... más páginas
  ];
  constructor() { }

  ngOnInit() {
  }

}
