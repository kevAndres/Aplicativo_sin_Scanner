import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paguinainicial',
  templateUrl: './paguinainicial.page.html',
  styleUrls: ['./paguinainicial.page.scss'],
})
export class PaguinainicialPage implements OnInit {
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
