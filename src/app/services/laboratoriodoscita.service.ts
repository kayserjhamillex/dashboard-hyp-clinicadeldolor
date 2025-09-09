import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListLaboratoriocita } from '../models/listlaboratoriodoscita';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriodoscitaService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/laboratoriodoscita';
  }
  getLaboratoriocitas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getLaboratoriocitaCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/examenes/${codigo}`);
  }

  getLaboratoriocitaFollow(codigo: string | number, estado: string) {
    return this.http.get(`${this.apiUrl}/gestion/${codigo}/${estado}`);
  }

  getLaboratoriocita(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteLaboratoriocita(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveLaboratoriocita( Laboratoriocita: ListLaboratoriocita) {
    return this.http.post(`${this.apiUrl}/create`, Laboratoriocita);
  }

  updateLaboratoriocita(id: string|number, updatedLaboratoriocita: ListLaboratoriocita): Observable<ListLaboratoriocita> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedLaboratoriocita);
  }

  getrxtmrmocita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cita/${codigo}`);
  }
  getrxtmrmolaboratorio(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/laboratorio/${codigo}`);
  }
  getrxtmrmoadmin(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/admin/${codigo}`);
  }
  getrxtmrmocliente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cliente/${codigo}`);
  }
  getrxtmrmdoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }
  getrxtmrmespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
  getrxtmrmotipo(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/tipo/${codigo}`);
  }
}
