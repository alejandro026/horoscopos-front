import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoroscoposService {

  constructor(private http: HttpClient) { }

  consultarDatos(){
    // https://backend-horoscopos.onrender.com/consultar-datos
    return this.http.get('https://backend-horoscopos.onrender.com/consultar-datos')
  }

  obtenerGraficas(){
    // return this.http.get('http://localhost:5000/kmeans')
    return this.http.get('http://127.0.0.1:5000/kmeans')
  }
  enviarDatos(datos){
    return this.http.post('http://127.0.0.1:5000/recibir_json', datos)
    // return this.http.get('https://horoscopos-python.onrender.com/kmeans')
  }

  aplicarFiltros(datos){
    return this.http.post('http://127.0.0.1:5000/filtrar', datos)
    // return this.http.get('https://horoscopos-python.onrender.com/kmeans')
  }

}
