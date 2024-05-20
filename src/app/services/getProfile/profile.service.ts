import { Injectable } from '@angular/core';
import { APIURL } from '../../../Shares/UrlApi'; // Importa la constante API_URL desde el archivo api-config
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrlregister: string = APIURL; // Variable para almacenar la URL de la API

  constructor(private http: HttpClient) { }


  getUsuario(): Observable<any> {
    return this.http.get(`${APIURL}/estudiante/${localStorage.getItem('IdEstCurForEsquelas')}`);
  
}
getQR(): Observable<any> {
  return this.http.get(`${APIURL}/estudiante/generarqr/${localStorage.getItem('IdEstCurForEsquelas')}`);

}
}
