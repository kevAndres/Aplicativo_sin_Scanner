import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user/login'; // Asegúrate de que esta es la URL correcta de tu endpoint de API
  private apiUrlregister = 'http://localhost:3000'; // Asegúrate de que esta es la URL correcta de tu endpoint de API

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // Define el cuerpo de la solicitud con las credenciales
    const body = { email: email, password: password };
    // Realiza la solicitud POST con el cuerpo de la solicitud
    return this.http.post(this.apiUrl, body);
  }
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

  registerDocente(data: {
    nombre: string;
    apellido: string;
    cedula: string;
    email: string;
    asignatura: string;
    password: string;
    rol: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlregister}/user/register`, data);
  }
}
