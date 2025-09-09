import { Observable } from 'rxjs';
import { Numero } from '../models/numero';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class NumeroService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/numero';
  }
  getNumeros() {
    return this.http.get(`${this.apiUrl}`);
  }

  getNumero(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteNumero(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveNumero( Numero: Numero) {
    return this.http.post(`${this.apiUrl}/create`, Numero);
  }

  updateNumero(id: string|number, updatedNumero: Numero): Observable<Numero> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedNumero);
  }
}
