import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListHorario } from '../models/listhorario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
    ) {
      this.apiUrl = this.wasa.apiUrlGlobal + '/horario';
    }
  getHorarios() {
    return this.http.get(`${this.apiUrl}`);
  }

  getHorario(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getHorarioEspecialidaddDia(dia: string, codigo: string) {
    return this.http.get(`${this.apiUrl}/disponibilidad/${dia}/${codigo}`);
  }

  deleteHorario(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveHorario( Horario: ListHorario) {
    return this.http.post(`${this.apiUrl}/create`, Horario);
  }

  updateHorario(id: string|number, updatedHorario: ListHorario): Observable<ListHorario> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedHorario);
  }

  gethorariodoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }

  gethorarioespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
}
