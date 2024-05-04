import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

interface JwtPayload {
  idRol?: string;
  user?: {
    nombre?: string;
    apellido?: string;
  };

  // ... cualquier otra propiedad que esperes en tu token
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlregister = 'http://localhost:3000'; // Asegúrate de que esta es la URL correcta de tu endpoint de API
  private representadosSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private router: Router) {}

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

  //metodo para login
  login(email: string, password: string): Observable<any> {
    // Define el cuerpo de la solicitud con las credenciales
    const body = { email: email, password: password };
    // Realiza la solicitud POST con el cuerpo de la solicitud
    return this.http.post(`${this.apiUrlregister}/user/login`, body);
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
