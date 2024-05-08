import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EstudiantesService } from '../services/getestudiantes/estudiantes.service';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MotivoEsquelas } from '../../Shares/MotivoEsquelas';
import { AuthService } from '../services/auth.service';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';

interface Estudiante {
  idEstudiantes: string;
}
@Component({
  selector: 'app-esquela',
  templateUrl: './esquela.page.html',
  styleUrls: ['./esquela.page.scss'],
})
export class EsquelaPage implements OnInit {
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;
  uploadMessage: string = '';
  base64Image: string | ArrayBuffer | null = null;

  formularioEsquela: FormGroup;
  username: string = '';
  Estudiantes: any[] = [];
  Motivos: string[] = MotivoEsquelas; // Inicializa el arreglo de opciones con los valores del archivo opciones.ts
  MotivoSeleccionado: string = ''; // Variable para almacenar la opción seleccionada del combo box
  AigCurso: Estudiante[] = [];

  constructor(
    private EstudiantesService: EstudiantesService,
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioEsquela = this.formBuilder.group({
      EstudianteCurso: ['', [Validators.required]],
      Motivo: ['', [Validators.required]],
      Descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  async presentError(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentConfirmacion(message: string) {
    const alert = await this.alertController.create({
      header: 'INFO',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }
  ngOnInit() {}

  ionViewDidEnter() {
    this.authService.AutentificatorLogin();
    this.UserName();
    this.loadEstudiantesCurso();
  }
  ionViewWillEnter() {
    this.authService.AutentificatorLogin();
    this.loadEstudiantesCurso();
    this.UserName();
    this.menu.enable(false, 'first');
  }
  RegisterEsquela() {
    if (this.formularioEsquela.valid) {
      const formData = {
        Motivo: this.formularioEsquela.get('Motivo')!.value, // Aserción no nula
        Descripcion: this.formularioEsquela.get('Descripcion')!.value, // Aserción no nula
        Evidencia: this.base64Image,
      };

      this.authService.registerEsquela(formData).subscribe({
        next: (response) => {
          console.log('Esquela registrada con éxito', response);
          this.presentConfirmacion(response);
          this.router.navigate(['/paguinainicial']); // Navegar de regreso
        },
        error: (error) => {
          console.error('Error al registrar la Esquela', error);
          this.presentError(error);
        },
      });
    } else {
      console.error('Datos no válidos');
    }
  }

  loadEstudiantesCurso() {
    this.EstudiantesService.getEstudiantesCurso().subscribe({
      next: (data) => {
        this.Estudiantes = data;
      },
      error: (Error) => {
        console.error('Error al cargar los estudiantes', Error);
      },
    });
  }
  UserName() {
    try {
      this.username = this.EstudiantesService.getUsername();
    } catch (error) {
      console.error(error);
    }
  }
  GetDataIdEstudiante(estudiante: any) {
    localStorage.setItem('Estudiante', estudiante.idEstudiantes);
    console.log(estudiante.idEstudiantes);
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  uploadFile(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];

      // Comprobar si el archivo es de tipo imagen (JPEG o PNG)
      if (file.type.match(/image\/(jpeg|png)/)) {
        this.previewImage(file);
      } else {
        console.log('Solo se permiten imágenes JPEG o PNG.');
        this.base64Image = null; // Resetear la vista previa si el tipo de archivo no es correcto
      }
    }
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string; // Guarda el resultado en base64
      console.log(this.base64Image);
    };
    reader.readAsDataURL(file); // Convierte la imagen a base64
  }
}
