import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as Papa from 'papaparse';
import { HoroscoposService } from 'src/app/shared/services/horoscopos.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private horoscoposService: HoroscoposService){

  }

  ngOnInit(): void {

  }


  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  //Consultando datos de la base de datos
  consultarDatos(){
    this.horoscoposService.consultarDatos().subscribe({next:(data:any)=>{
      console.log(data.data);
      //Asigando los datos al datasource
      this.dataSource = new MatTableDataSource(data.data);
      //Asignando columnas
      this.displayedColumns = Object.keys(data.data[0]);
      this.dataSource.paginator = this.paginator;

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos consultados correctamente',
        showConfirmButton: true
        // timer: 1500
      })
    }})
  }

  // Método que se ejecuta cuando se selecciona un archivo
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.parseCsv(file);
  }

  // Método para parsear el contenido del archivo CSV
  private parseCsv(file: any) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData = reader.result as string;
      const parsedData = this.parseData(csvData);
      this.dataSource = new MatTableDataSource(parsedData);
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = Object.keys(parsedData[0]);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos importados correctamente',
        showConfirmButton: true
        // timer: 1500
      })

    };
  }

  // Método para convertir el contenido CSV en un arreglo de objetos
  private parseData(csvData: string) {
    const lines = csvData.split('\n');
    const data = [];

    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j];
      }
      data.push(obj);
    }
    return data;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Exportar los archivos
  exportarCSV() {
    console.log(this.dataSource)
    const csvData = Papa.unparse(this.dataSource.filteredData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  limpiar(){
    this.dataSource=new MatTableDataSource([]);
    this.displayedColumns=[]
  }

}
