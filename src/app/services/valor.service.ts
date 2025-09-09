import { Observable } from 'rxjs';
import { Valor } from '../models/valor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ValorService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/valor';
  }
  getValors() {
    return this.http.get(`${this.apiUrl}`);
  }

  getValor(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteValor(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveValor( Valor: Valor) {
    return this.http.post(`${this.apiUrl}/create`, Valor);
  }

  updateValor(id: string|number, updatedValor: Valor): Observable<Valor> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedValor);
  }
}
