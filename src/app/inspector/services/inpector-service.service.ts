import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIURL } from '../../../Shares/UrlApi'

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
}
