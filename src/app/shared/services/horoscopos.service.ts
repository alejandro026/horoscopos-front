import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoroscoposService {

  constructor(private http: HttpClient) { }

  consultarDatos(){
    // https://backend-horoscopos.onrender.com/guardar-datos
    return this.http.get('https://backend-horoscopos.onrender.com/guardar-datos/consultar-datos')
  }
}
