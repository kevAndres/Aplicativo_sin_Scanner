import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private mainPages: string[] = [
    '/paguinainicial',
    '/paguinaprincipalrepresentante',
    '/tabs/atrasos',
    '/tabs/configuracion',
    '/tabs/filtros',
    '/home',
    '/inicioadmin/configuracion'
  ];
  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        if (this.mainPages.includes(this.router.url)) {
          (navigator as any).app.exitApp();  // Cierra la aplicación si el usuario está en una de las páginas principales
        } else {
          processNextHandler();
        }
      });
    });
  }
}
