import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  // Definir el formulario como FormGroup
  formulario: FormGroup;

  // Constructor donde se inyecta el FormBuilder
  constructor(private fb: FormBuilder, private http: HttpClient) {}

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
      if (this.formulario.valid) {
      this.http.post<any>('https://backend-horoscopos.onrender.com/guardar-datos', formData)
        .subscribe(
          (response) => {
            console.log('Datos guardados correctamente en la base de datos');
            Swal.fire({
              title: 'Respuestas guardadas',
              text: 'Muchas gracias por contestar c:',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          (error) => {
            console.error('Error al guardar los datos en la base de datos: ', error);
          }
        );
        }
    }

}
