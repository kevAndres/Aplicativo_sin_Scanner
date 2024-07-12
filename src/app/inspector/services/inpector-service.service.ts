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
}
