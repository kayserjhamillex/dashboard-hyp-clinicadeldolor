import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { Especialidad } from '../models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/especialidad';
  }
  getEspecialidads() {
    return this.http.get(`${this.apiUrl}`);
  }

  getEspecialidad(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteEspecialidad(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveEspecialidad( Especialidad: Especialidad) {
    return this.http.post(`${this.apiUrl}/create`, Especialidad);
  }

  updateEspecialidad(id: string|number, updatedEspecialidad: Especialidad): Observable<Especialidad> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedEspecialidad);
  }
}
