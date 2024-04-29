import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import {jwt_decode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000/user/login'; // Asegúrate de que esta es la URL correcta de tu endpoint de API
  private apiUrlregister = 'http://localhost:3000'; // Asegúrate de que esta es la URL correcta de tu endpoint de API

  constructor(private http: HttpClient) {}

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
}
