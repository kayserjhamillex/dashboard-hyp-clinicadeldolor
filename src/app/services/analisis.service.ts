import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Analisis } from '../models/analisis';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/analisis';
  }
  getAnalisiss() {
    return this.http.get(`${this.apiUrl}`);
  }

  getAnalisisCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/examenes/${codigo}`);
  }

  getAnalisisLab(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/listadoanalizado/${codigo}`);
  }

  getAnalisisFollow(codigo: string | number, estado: string) {
    return this.http.get(`${this.apiUrl}/gestion/${codigo}/${estado}`);
  }

  getAnalisis(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteAnalisis(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveAnalisis( analisis: Analisis) {
    return this.http.post(`${this.apiUrl}/create`, analisis);
  }

  updateAnalisis(id: string|number, updatedanalisis: Analisis): Observable<Analisis> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedanalisis);
  }

  getanalisiscita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cita/${codigo}`);
  }
  getanalisislaboratorio(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/laboratorio/${codigo}`);
  }
  getanalisisadmin(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/admin/${codigo}`);
  }
  getanalisiscliente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cliente/${codigo}`);
  }
  getanalisisdoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }
  getanalisisespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
  getanalisistipo(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/tipo/${codigo}`);
  }

}
