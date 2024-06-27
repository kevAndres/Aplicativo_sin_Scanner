import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError,of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { tap,map,catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { APIURL } from '../../Shares/UrlApi'; // Importa la constante API_URL desde el archivo api-config

interface JwtPayload {
  idRol?: string;
  user?: {
    nombre?: string;
    apellido?: string;
  };

  // ... cualquier otra propiedad que esperes en tu token
}
interface EsquelaData {
  Motivo: string;
  Descripcion: string;
  Evidencia?: string | ArrayBuffer | null; // Hacer opcional el campo de evidencia
  cita?: string | ArrayBuffer | null; // Hacer opcional el campo de evidencia

}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrlregister: string = APIURL; // Variable para almacenar la URL de la API
  private representadosSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private router: Router,    private alertController: AlertController
  ) {}

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }
  private decodeToken(): JwtPayload | null {
    const token = this.getToken();
    try {
      return token ? jwtDecode<JwtPayload>(token) : null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: '¡UPS!',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  //metodo para login
  loginr(email: string, password: string): Observable<any> {
    // Define el cuerpo de la solicitud con las credenciales
    const body = { email: email, password: password };
    // Realiza la solicitud POST con el cuerpo de la solicitud
    return this.http.post(`${this.apiUrlregister}/user/login`, body);
  }
  login(email: string, password: string): Observable<boolean> {
    const body = { email: email, password: password };
    return this.http.post(`${this.apiUrlregister}/user/login`, body).pipe(
      map((response: any) => {
        console.log(response.token);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error en el login', error);
        const mensajeError = error.error && error.error.message
          ? error.error.message
          : 'Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo.';
        this.presentAlert(mensajeError); // Aquí llamas a u función presentAlert con el mensaje de error
        return new Observable<boolean>(subscriber => {
          subscriber.next(false);
          subscriber.complete();
        });
         // Devuelve un Observable con valor false para indicar un inicio de sesión fallido
      })
    );
  }

  isLoggedIn(): boolean {
    // Verifica si el token de sesión está presente en el almacenamiento local
    return !!localStorage.getItem('token');
  }
  
  // Si el usuario no está logueado, redirigirlo a la página de inicio de sesión
  public AutentificatorLogin(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  getRoleIdPrefix(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.idRol) {
        // Aquí asumimos que el rol está en un formato específico (por ejemplo, 'REP123')
        return decodedToken.idRol.substring(0, 3); // Devuelve las primeras tres letras del rol
      }
    }
    return ''; // Devuelve una cadena vacía si no se puede obtener el prefijo del rol
  }
  //metodo para registrar representantes
  registerRepresentante(data: {
    nombre: string;
    apellido: string;
    cedula: string;
    email: string;
    password: string;
    rol: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlregister}/user/register`, data);
  }
  //metodo para registrar docentes
  registerDocente(data: {
    nombre: string;
    apellido: string;
    cedula: string;
    email: string;
    //asignatura: string;
    password: string;
    rol: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlregister}/user/register`, data);
  }
  //metodos para registrar estudiantes
  registerEstudiante(data: {
    NombreEst: string;
    ApellidoEst: string;
    cedula: string;
    curso_idCurso: string;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token. Por favor inicia sesión.');
    }
    const body = {
      ...data,
      token, // Agrega el token al cuerpo de la solicitud
    };
    // Asegúrate de que apiUrl es la variable correcta que contiene la base de la URL de tu API.
    return this.http.post(`${this.apiUrlregister}/estudiante/register`, body);
  }
  registerAsignatura(data: {
    asignatura_idasignatura: string;
    curso_idCurso: string;
 
  }): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token. Por favor inicia sesión.');
    }
    const body = {
      ...data,
      token, // Agrega el token al cuerpo de la solicitud
    };
    return this.http.post(`${this.apiUrlregister}/docente/asignacionMateria`, body);
  }

  registerEsquela_API(data: EsquelaData): Observable<any> {
    const token = localStorage.getItem('token');
    const estudiantes_idEstudiantes = localStorage.getItem('Estudiante');
    const asignación_docente_materia_idAsignacion = localStorage.getItem('MateriaDocente');

    if (!token) {
      // Mejor manejo del error con Observable para integrarse en la cadena de observables
      return throwError(() => new Error('No hay token. Por favor inicia sesión.'));
    }

    const body = {
      ...data,
      token, 
      estudiantes_idEstudiantes,
      asignación_docente_materia_idAsignacion
    };

    return this.http.post(`${this.apiUrlregister}/esquela/registrar`, body)
      .pipe(
        catchError((error) => {
          // Manejo de errores HTTP
          console.error('Error al registrar la esquela', error);
          return throwError(() => new Error('Error al registrar la esquela'));
        })
      );
  }
  getRepresentados(): Observable<any> {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idRol) {
      return this.http.get(
        `${this.apiUrlregister}/estudiante/representante/${decodedToken.idRol}`
      );
    } else {
      throw new Error('No token available or token is invalid');
    }
  }

  limpiarrepresentados(): void {
    // Resetear los BehaviorSubjects o cualquier otra variable de estado
    this.representadosSubject.next([]);
    localStorage.removeItem('token'); // Remueve el token del localStorage

    // Aquí también podrías limpiar cualquier otro estado o almacenamiento local
    console.log('Todos los datos de usuario han sido borrados.');
  }
}
