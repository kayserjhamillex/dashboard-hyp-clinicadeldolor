import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListExamenCita } from '../models/listexamenpaciente';

@Injectable({
  providedIn: 'root'
})
export class ExamencitaService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/examen';
  }
  getExamenCitas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getExamenCitaCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/dolor/${codigo}`);
  }

  getExamenCita(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteExamenCita(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveExamenCita( examenCita: ListExamenCita) {
    return this.http.post(`${this.apiUrl}/create`, examenCita);
  }

  updateExamenCita(id: string|number, updatedexamenCita: ListExamenCita): Observable<ListExamenCita> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedexamenCita);
  }
  getexamencliente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cliente/${codigo}`);
  }
  getexamenadmin(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/admin/${codigo}`);
  }
  getexamendoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }
  getexamenespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
}
