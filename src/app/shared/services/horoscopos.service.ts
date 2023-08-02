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
    // return this.http.get('http://localhost:3000/consultar-datos')
  }

  obtenerGraficas(k){
    // return this.http.get('https://wildcat-mutual-stud.ngrok-free.app/kmeans')
    return this.http.get('https://wildcat-mutual-stud.ngrok-free.app/kmeans/'+k)
  }

  agglomerativeClustering(k){
    // return this.http.get('https://wildcat-mutual-stud.ngrok-free.app/kmeans')
    return this.http.get('https://wildcat-mutual-stud.ngrok-free.app/agglomerativeClustering/'+k)
  }
  enviarDatos(datos){
    return this.http.post('https://wildcat-mutual-stud.ngrok-free.app/recibir_json', datos)
    // return this.http.get('https://horoscopos-python.onrender.com/kmeans')
  }

  aplicarFiltros(datos){
    return this.http.post('https://wildcat-mutual-stud.ngrok-free.app/filtrar', datos)
    // return this.http.get('https://horoscopos-python.onrender.com/kmeans')
  }
}
