import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/getestudiantes/estudiantes.service';
import { AuthService } from '../../services/auth.service';
import { HeaderServiceService } from 'src/Shares/Services/header-service.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  username: string = '';
  public TitleHeader: string;

  constructor(  
    private authService: AuthService,
    private EstudiantesService: EstudiantesService,
    private HeaderServiceService: HeaderServiceService
  ) { 
    this.TitleHeader = this.HeaderServiceService.appTitle;

  }

  ngOnInit() {
    this.UserName();
    
  }
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
  logout() {
    this.EstudiantesService.clearUserData();
    this.authService.limpiarrepresentados();
  }
}
