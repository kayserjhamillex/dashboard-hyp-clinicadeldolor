import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resultado } from '../models/resultado';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/resultado';
  }
  getResultados() {
    return this.http.get(`${this.apiUrl}`);
  }

  getResultadoCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/examenes/${codigo}`);
  }

  getResultadoFollow(codigo: string | number, estado: string) {
    return this.http.get(`${this.apiUrl}/gestion/${codigo}/${estado}`);
  }

  getResultado(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteResultado(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveResultado( Resultado: Resultado) {
    return this.http.post(`${this.apiUrl}/create`, Resultado);
  }

  updateResultado(id: string|number, updatedResultado: Resultado): Observable<Resultado> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedResultado);
  }

}
