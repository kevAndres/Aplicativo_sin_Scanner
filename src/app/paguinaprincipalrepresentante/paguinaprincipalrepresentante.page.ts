import { Component, OnDestroy, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstudiantesService } from '../services/getestudiantes/estudiantes.service';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-paguinaprincipalrepresentante',
  templateUrl: './paguinaprincipalrepresentante.page.html',
  styleUrls: ['./paguinaprincipalrepresentante.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class PaguinaprincipalrepresentantePage implements OnInit, OnDestroy {
  representados: any[] = [];
  username: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private menu: MenuController,
    private EstudiantesService: EstudiantesService
  ) {}

  ngOnInit() {
   // this.ChargeEstudents();
  }

  ionViewDidEnter() {
    this.authService.AutentificatorLogin();
    this.ChargeEstudents(); 
  }
  ionViewWillEnter(){
    this.authService.AutentificatorLogin();
    this.ChargeEstudents(); 
    this.menu.enable(true, 'first');

  }



  ChargeEstudents() {
    this.subscriptions.add(
      this.EstudiantesService.getRepresentados().subscribe(
        data => {
          this.representados = data;
        },
        error => {
          console.error('Error al cargar los representados', error);
        }
      )
    );

    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }

  RegisterDirection() {
    this.router.navigate(['/registroestudiante']);
  }

  ngOnDestroy() {
   // this.subscriptions.unsubscribe();
  }

  logout() {
    this.authService.limpiarrepresentados();
    this.EstudiantesService.clearUserData();
  }
}
