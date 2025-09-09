import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Objetivo } from '../models/objetivo';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/objetivo';
  }
  getObjetivos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getObjetivo(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteObjetivo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveObjetivo( Objetivo: Objetivo) {
    return this.http.post(`${this.apiUrl}/create`, Objetivo);
  }

  updateObjetivo(id: string|number, updatedObjetivo: Objetivo): Observable<Objetivo> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedObjetivo);
  }
}
