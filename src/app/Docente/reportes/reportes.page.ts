import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  username: string = '';
  constructor(    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private EstudiantesService: EstudiantesService,
    private menu: MenuController) { }

  ngOnInit() {
    
  }
  logout() {
    this.EstudiantesService.clearUserData();
    this.authService.limpiarrepresentados();
  }
  ionViewWillEnter() {
   
    this.menu.enable(true, 'first');
    this.authService.AutentificatorLogin();

  }
}
