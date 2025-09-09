import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListDuracionCita } from '../models/listduracioncita';

@Injectable({
  providedIn: 'root'
})
export class DuracioncitaService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/duracioncita';
  }
  getDuracionCitas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getDuracionesCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/dolor/${codigo}`);
  }

  getDuracionCita(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteDuracionCita(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveDuracionCita( DuracionCita: ListDuracionCita) {
    return this.http.post(`${this.apiUrl}/create`, DuracionCita);
  }

  updateDuracionCita(id: string|number, updatedDuracionCita: ListDuracionCita): Observable<ListDuracionCita> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedDuracionCita);
  }

  getDuracioncliente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cliente/${codigo}`);
  }
  getDuracionadmin(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/admin/${codigo}`);
  }
  getDuraciondoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }
  getDuracionespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
}
