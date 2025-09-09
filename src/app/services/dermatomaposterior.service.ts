import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListDermatomaPosterior } from '../models/listdermatomaposterior';

@Injectable({
  providedIn: 'root'
})
export class DermatomaposteriorService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/dermatomaposterior';
  }
  getDermatomaposteriors() {
    return this.http.get(`${this.apiUrl}`);
  }

  getDermatomaposteriorCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/dolor/${codigo}`);
  }

  getDermatomaposterior(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteDermatomaposterior(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveDermatomaposterior( dermatomaposterior: ListDermatomaPosterior) {
    return this.http.post(`${this.apiUrl}/create`, dermatomaposterior);
  }

  updateDermatomaposterior(id: string|number, updateddermatomaposterior: ListDermatomaPosterior): Observable<ListDermatomaPosterior> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updateddermatomaposterior);
  }
  getDermatomaposteriorcliente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cliente/${codigo}`);
  }
  getDermatomaposterioradmin(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/admin/${codigo}`);
  }
  getDermatomaposteriordoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }
  getDermatomaposteriorespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
}
