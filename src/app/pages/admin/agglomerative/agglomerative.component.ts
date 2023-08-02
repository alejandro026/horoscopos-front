import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HoroscoposService } from 'src/app/shared/services/horoscopos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agglomerative',
  templateUrl: './agglomerative.component.html',
  styleUrls: ['./agglomerative.component.scss']
})
export class AgglomerativeComponent implements OnInit {

  graficas: any = null;
  graficas2: any = null;

  numSig:number;

  constructor(private horoscoposService: HoroscoposService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    console.log(this.data)
    this.graficas=this.data.graficas;
    this.numSig=this.data.numSig
  }

  ngAfterViewInit(): void {
    this.obtenerGraficas();
  }

  obtenerGraficas(){
    this.horoscoposService.agglomerativeClustering(this.numSig).subscribe({
      next: data => {
        this.spinner.hide();
        console.log(data);
        this.graficas2 = data;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Comparacion aplicada correctamente',
            showConfirmButton: true
            // timer: 1500
          })
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

}
