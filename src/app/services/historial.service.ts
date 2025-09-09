import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListHistorial } from '../models/listhistorial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/historial';
  }
  getHistorials() {
    return this.http.get(`${this.apiUrl}`);
  }
  getHistorialCliente(codigo: string|number) {
    return this.http.get(`${this.apiUrl}/filtrocliente/${codigo}`);
  }  // getHistorialTipo(tipo: string) {
  //   return this.http.get(`${this.apiUrl}/filtro/${tipo}`);
  // }

  getHistorial(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteHistorial(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveHistorial( Historial: ListHistorial) {
    return this.http.post(`${this.apiUrl}/create`, Historial);
  }

  updateHistorial(id: string|number, updatedHistorial: ListHistorial): Observable<ListHistorial> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedHistorial);
  }
}
