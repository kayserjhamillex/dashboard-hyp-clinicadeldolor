import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Parrafo } from '../models/parrafo';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ParrafoService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/parrafo';
  }
  getParrafos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getParrafo(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getBlog(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/blog/${codigo}`);
  }

  deleteParrafo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveParrafo( Parrafo: Parrafo) {
    return this.http.post(`${this.apiUrl}/create`, Parrafo);
  }

  updateParrafo(id: string|number, updatedParrafo: Parrafo): Observable<Parrafo> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedParrafo);
  }
}
