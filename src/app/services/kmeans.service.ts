import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Kmeans {

  constructor(private http: HttpClient) { }

  enviarDatosAlServidor(data: any[]) {
    const url = 'https://horoscopos-python.onrender.com/kmeans';
    return this.http.post<any>(url, data);
  }
}
