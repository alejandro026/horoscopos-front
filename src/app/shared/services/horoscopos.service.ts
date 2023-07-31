import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

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

  descargarPDF() {
    // Hacer la petición HTTP GET al servidor Flask para descargar el PDF
    const url = 'http://127.0.0.1:5000/descargar_pdf';
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (data) => {
        // Crear un objeto Blob con la respuesta del servidor
        const blob = new Blob([data], { type: 'application/pdf' });

        // Descargar el archivo usando file-saver
        saveAs(blob, 'graficas.pdf');
      },
      (error) => {
        console.error('Error al descargar el PDF', error);
      }
    );
  }

}
