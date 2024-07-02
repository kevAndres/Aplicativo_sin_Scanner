import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
@Component({
  selector: 'app-all-atrasos',
  templateUrl: './all-atrasos.page.html',
  styleUrls: ['./all-atrasos.page.scss'],
})
export class AllAtrasosPage implements OnInit {
  username: string = '';
  atrasosByInspector: any[] = [];
  constructor(
    private authService: AuthService,
    private EstudiantesService: EstudiantesService
  ) {}

  ngOnInit() {}
  logout() {
    this.EstudiantesService.clearUserData();
    this.authService.limpiarrepresentados();
  }
  ionViewDidEnter() {
    this.UserName();
    this.authService.AutentificatorLogin();
    this.cargarAtrasosByInspector();
  }
  ionViewWillEnter() {
    this.UserName();
    this.authService.AutentificatorLogin();
    this.cargarAtrasosByInspector();
  }
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
  cargarAtrasosByInspector() {
    this.EstudiantesService.getAtrasosByInspector().subscribe(
      (data) => {
        this.atrasosByInspector = data;
      },
      (Error) => {
        console.error(
          'Error al cargar las asignaciones  de asignaturas del docente',
          Error
        );
      }
    );
  }
}
