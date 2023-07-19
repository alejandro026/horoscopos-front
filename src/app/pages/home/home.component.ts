import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


  // Definir el formulario como FormGroup
  formulario: FormGroup;

  // Constructor donde se inyecta el FormBuilder
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Inicializar el formulario con 10 preguntas y validaciones
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
    });
  }

    // Función para enviar el formulario
    enviarFormulario() {
      if (this.formulario.valid) {
        // Aquí puedes procesar los datos del formulario
        console.log(this.formulario.value);
      }
    }

}
