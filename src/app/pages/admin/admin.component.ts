import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Papa from 'papaparse';
import { HoroscoposService } from 'src/app/shared/services/horoscopos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  datos: any[] = [];

  // Definir los signos zodiacales y características disponibles
  signosZodiacales = ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo'];
  caracteristicas = [
    'pregunta2',
    'pregunta3',
    'pregunta4',
    'pregunta5',
    'pregunta6',
    'pregunta7',
    'pregunta8',
    'pregunta9',
    'pregunta10',
    'pregunta11',
    'pregunta12',
  ];

  // Variables para almacenar las selecciones del usuario
  selectedSignos: string[] = [];
  selectedCaracteristicas: string[] = [];

  // Crear objetos separados para almacenar el estado seleccionado de cada checkbox
  isSignoSelected: { [key: string]: boolean } = {};
  isCaracteristicaSelected: { [key: string]: boolean } = {};


  @ViewChild(MatPaginator) paginator: MatPaginator;

  graficas: any = null;

  constructor(private horoscoposService: HoroscoposService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    //this.obtenerDatos();
  }


  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  actualizarSignosSeleccionados(signo: string) {
    // Actualizar el arreglo selectedSignos basado en los checkboxes seleccionados
    this.selectedSignos = this.signosZodiacales.filter(signo => this.isSignoSelected[signo]);
  }

  actualizarCaracteristicasSeleccionadas(caracteristica: string) {
    // Actualizar el arreglo selectedCaracteristicas basado en los checkboxes seleccionados
    this.selectedCaracteristicas = this.caracteristicas.filter(car => this.isCaracteristicaSelected[car]);
  }


  // Método para obtener los datos del servicio
  obtenerDatos() {
    this.spinner.show();

    this.horoscoposService.consultarDatos().subscribe({
      next: (data: any) => {
        console.log(data.data);
        //Asignar los datos obtenidos al arreglo 'datos'
        this.datos = data.data;
      },
      error: (e) => {
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrió un error al obtener los datos',
          showConfirmButton: true
        });
      }
    });
  }



  //Consultando datos de la base de datos
  consultarDatos() {
    this.spinner.show();

    this.horoscoposService.consultarDatos().subscribe({
      next: (data: any) => {
        console.log(data.data);
        //Asigando los datos al datasource
        this.dataSource = new MatTableDataSource(data.data);
        //Asignando columnas
        this.displayedColumns = Object.keys(data.data[0]);
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos consultados correctamente',
          showConfirmButton: true
          // timer: 1500
        })
      }, error: e => {
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrió un error al realizar la consulta',
          showConfirmButton: true
          // timer: 1500
        })

      }
    })
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

  limpiar() {
    this.dataSource = new MatTableDataSource([]);
    this.displayedColumns = [];
    this.graficas = null;
  }

  obtenerGraficas() {
    this.spinner.show();
    this.horoscoposService.obtenerGraficas().subscribe({
      next: data => {
        this.spinner.hide();
        console.log(data);
        this.graficas = data;
      }, error: e => {
        this.spinner.hide();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrió un error al generar las gráficas',
          showConfirmButton: true
          // timer: 1500
        })
      }
    })
  }

  bytesToImageUrl(bytes: Uint8Array, tipoImagen: string): string {
    return `data:${tipoImagen};base64,${bytes}`;
  }

  enviarDatos2() {
    if (this.dataSource && this.dataSource.filteredData.length > 0) {
      const datosFinales = [];

      //Se quitan las primeras dos preguntas.
      this.dataSource.filteredData.forEach(data => {
        const { id, pregunta1, ...resto } = data;
        datosFinales.push(resto);
      });
      console.log(datosFinales);
      this.horoscoposService.enviarDatos(datosFinales).subscribe({
        next: data => {
          console.log(data)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos enviados correctamente',
            showConfirmButton: true
            // timer: 1500
          })
        }, error: e => {

        }
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Es necesario cargar el set de datos',
        showConfirmButton: true
        // timer: 1500
      })
    }
  }

  enviarDatos() {
    const validacion=this.validaFormatoExcel(this.dataSource.filteredData);
    if(!validacion){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El set de datos no tiene el formato adecuado',
        showConfirmButton: true
        // timer: 1500
      })
      return;
    }
    if (this.dataSource && this.dataSource.filteredData.length > 0) {
      const datosFinales = [];

      // Obtener todas las preguntas seleccionadas (excluyendo id y pregunta1)
      const preguntasSeleccionadas = this.selectedCaracteristicas;

      this.dataSource.filteredData.forEach(data => {
        console.log('Preguntas presentes en la fila:', Object.keys(data));

        const datosFiltrados = {};

        // Filtrar las preguntas seleccionadas para cada fila
        for (const pregunta of preguntasSeleccionadas) {
          if (data.hasOwnProperty(pregunta)) {
            datosFiltrados[pregunta] = data[pregunta];
          } else {
            console.log(`Pregunta ${pregunta} no encontrada en la fila`);
          }
        }

        console.log('Fila filtrada:', datosFiltrados);

        datosFinales.push(datosFiltrados);
      });

      console.log('Arreglo final:', datosFinales);

      this.horoscoposService.enviarDatos(datosFinales).subscribe({
        next: data => {
          console.log(data)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos enviados correctamente',
            showConfirmButton: true
            // timer: 1500
          })
        }, error: e => {

        }
      })
    } else {
    }
  }

  //Mustra un si o un no en la tabla de datos
  datosTablaSiNo(estado, column){
    const mapa: { [key: number]: string } = {
      1: "Aries",
      2: "Tauro",
      3: "Géminis",
      4: "Cáncer",
      5: "Leo",
      6: "Virgo",
    };
    if(column=="id"){
      return estado;
    }
    if(column=="pregunta1"){
      return mapa[estado];
    }
    if (estado==0) {
      return "No";
    }
    if(estado ==1){
      return "Si";
    }

    return estado
  }

  tituloColumna(columna){
    const mapa: { [key: string]: string } = {
      id: "",
      pregunta1: "Signo",
      pregunta2: "Lider natural",
      pregunta3: "Impulsivo",
      pregunta4: "Perseverante",
      pregunta5: "Curioso",
      pregunta6: "Autoconfianza",
      pregunta7: "Organizado",
      pregunta8: "Sensible/Cariñoso",
      pregunta9: "Reservado",
      pregunta10: "Paciente/Practico",
      pregunta11: "Expora diferentes ideas",
      pregunta12: "Impaciente",
    };
    if(mapa[columna]==undefined){
      return columna;
    }
    // console.log()
    return mapa[columna];
  }

  validaFormatoExcel(valor){
    const celdas=  Object.keys(valor[0]);
    if(celdas[0]=="id"&&celdas[1]=="pregunta1"){
      return true;
    }else{
      return false;
    }

  }

}
