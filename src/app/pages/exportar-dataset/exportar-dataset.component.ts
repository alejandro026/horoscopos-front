import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-exportar-dataset',
  templateUrl: './exportar-dataset.component.html',
  styleUrls: ['./exportar-dataset.component.scss']
})
export class ExportarDatasetComponent {

  constructor(private http: HttpClient) {}

  exportarCsv() {
    // Llamar a la ruta '/export-csv' en el servidor
    this.http.get('https://backend-horoscopos.onrender.com/export-csv', { responseType: 'blob' })
      .subscribe(
        (data: Blob) => {
          // Crear un objeto URL para el archivo CSV
          const csvUrl = window.URL.createObjectURL(data);

          // Crear un elemento 'a' para descargar el archivo CSV
          const a = document.createElement('a');
          a.href = csvUrl;
          a.download = 'dataset.csv';
          a.click();

          // Liberar el objeto URL después de descargar el archivo
          window.URL.revokeObjectURL(csvUrl);
        },
        (error) => {
          console.error('Error al exportar a CSV: ', error);
        }
      );
  }

  exportarJson() {
    // Llamar a la ruta '/export-json' en el servidor
    this.http.get('https://backend-horoscopos.onrender.com/export-json', { responseType: 'blob' })
      .subscribe(
        (data: Blob) => {
          // Crear un objeto URL para el archivo JSON
          const jsonUrl = window.URL.createObjectURL(data);

          // Crear un elemento 'a' para descargar el archivo JSON
          const a = document.createElement('a');
          a.href = jsonUrl;
          a.download = 'dataset.json';
          a.click();

          // Liberar el objeto URL después de descargar el archivo
          window.URL.revokeObjectURL(jsonUrl);
        },
        (error) => {
          console.error('Error al exportar a JSON: ', error);
        }
      );
  }

}
