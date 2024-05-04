import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { EstudiantesService } from '../services/getestudiantes/estudiantes.service';

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
  username: string = '';
  asignaturasdocente: any[] = [];



  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private EstudiantesService: EstudiantesService

  ) {}

  ngOnInit() {}
  logout() {
    this.EstudiantesService.clearUserData();
    this.EstudiantesService.clearUserData();
  };
  ionViewDidEnter() {
    this.UserName(); 
    this.ChargeAsignacionAignaturas();
  }
  ionViewWillEnter(){
    this.UserName(); 
    this.ChargeAsignacionAignaturas();


  }
  ChargeAsignacionAignaturas(){
    this.EstudiantesService.getAsignaturasDocente().subscribe(
      data => {
        this.asignaturasdocente = data;
      },
      Error => {
        console.error('Error al cargar las asignaciones  de asignaturas del docente', Error)
      }
    )
  }
  UserName(){
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }

}