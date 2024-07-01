import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { APIURL } from '../../../Shares/UrlApi'; // Importa la constante API_URL desde el archivo api-config
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EsquelasService {

  constructor(private http: HttpClient) { }

  getEsquelasIdEstudiante(): Observable<any> {
    return this.http.get(`${APIURL}/esquela/estudiante/${localStorage.getItem('IdEstCurForEsquelas')}`);
  }

}
