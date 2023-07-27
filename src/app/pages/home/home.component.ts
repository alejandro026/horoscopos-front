import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  // Definir el formulario como FormGroup
  formulario: FormGroup;

  cargando:boolean=false;

  // Constructor donde se inyecta el FormBuilder
  constructor(private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    // Inicializar el formulario con 12 preguntas y validaciones
    this.formulario = this.fb.group({
      pregunta1: ['', Validators.required],
      pregunta2: ['', Validators.required],
      pregunta3: ['', Validators.required],
      pregunta4: ['', Validators.required],
      pregunta5: ['', Validators.required],
      pregunta6: ['', Validators.required],
      pregunta7: ['', Validators.required],
      pregunta8: ['', Validators.required],
      pregunta9: ['', Validators.required],
      pregunta10: ['', Validators.required],
      pregunta11: ['', Validators.required],
      pregunta12: ['', Validators.required]
    });
  }

    guardarDatos(formData: any) {
      let yaGuardo=localStorage.getItem('guardado');
      console.log(yaGuardo)
      if(!yaGuardo){
        this.cargando=true
        this.spinner.show();
        if (this.formulario.valid) {
          this.http.post<any>('https://backend-horoscopos.onrender.com/guardar-datos', formData)
            .subscribe(
              (response) => {
                this.cargando=false;
                this.spinner.hide();
                console.log('Datos guardados correctamente en la base de datos');
                localStorage.setItem('guardado', "1");
                Swal.fire({
                  title: 'Respuestas guardadas',
                  text: 'Muchas gracias por contestar c:',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              },
              (error) => {
                this.cargando=false;
                this.spinner.hide();
                console.error('Error al guardar los datos en la base de datos: ', error);
              }
            );
            }else{
              this.cargando=false;
              this.spinner.hide();
            }
      } else{
        this.cargando=false;
        this.spinner.hide();
        Swal.fire({
          title: 'Ya respondiste las preguntas',
          text: 'Muchas gracias por contestar c:',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    }

}
