import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIURL } from '../../../Shares/UrlApi'

export interface Asignatura {
  idasignatura: number;
  nombre: string;
  descripcion: string;
}

export interface Curso {
  idCurso: number;
  curso: string;
  paralelo: string;
  especialidad: string;
}
export interface Docente {
  iduser: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol: string;
}
export interface Representante {
  iduser: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  rol: string;
}
@Injectable({
  providedIn: 'root'
})
export class InpectorServiceService {
  private apiUrl =APIURL
  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/curso/all`);
  }

  addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}/curso/register`, curso);
  }
  updateCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/curso/cursos/${curso.idCurso}`, curso);
  }
  deleteCurso(idCurso: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/curso/cursos/${idCurso}`);
  }

  //METODOS DE LAS ASIGNATURAS
  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}/asignatura/all`);
  }
  
  addAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.post<Asignatura>(`${this.apiUrl}/asignatura/register`, asignatura);
  }
  deleteAsignatura(idAsignatrura: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/asignatura/delete/${idAsignatrura}`);
  }

  //METODOS DEL DOCENTE EN CONFIGURACION
  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${this.apiUrl}/user/register`, docente);
  }
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.apiUrl}/docente/user/all`);
  }
  updateDocente(docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.apiUrl}/docente/update/${docente.iduser}`, docente);
  }
  deleteDocente(iduser: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/docente/delete/${iduser}`);
  }
   //METODOS DEL REPRESENTANTE EN CONFIGURACION
   addRepresenta(representante: Representante): Observable<Representante> {
    return this.http.post<Representante>(`${this.apiUrl}/user/register`, representante);
  }
   getRepresentantes(): Observable<Representante[]> {
    return this.http.get<Representante[]>(`${this.apiUrl}/representante/user/all`);
  }
  updateRepresentate(representante: Representante): Observable<Representante> {
    return this.http.put<Representante>(`${this.apiUrl}/representante/update/${representante.iduser}`, representante);
  }
  deleteRepresentate(iduser: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/representante/delete/${iduser}`);
  }
}
