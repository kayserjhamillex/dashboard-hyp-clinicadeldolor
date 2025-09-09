import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListAntPatologicoCita } from '../models/Listantpatologicocita';

@Injectable({
  providedIn: 'root'
})
export class AntpatologicocitaService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/antecedentepatologicocita';
  }
  getAntPatologicoCitas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getAntPatologicoesCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/dolor/${codigo}`);
  }

  getAntPatologicoCita(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteAntPatologicoCita(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveAntPatologicoCita( antecedentecita: ListAntPatologicoCita) {
    return this.http.post(`${this.apiUrl}/create`, antecedentecita);
  }

  updateAntPatologicoCita(id: string|number, updatedantecedentecita: ListAntPatologicoCita): Observable<ListAntPatologicoCita> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedantecedentecita);
  }

  getAntPatologicocliente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cliente/${codigo}`);
  }
  getAntPatologicoadmin(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/admin/${codigo}`);
  }
  getAntPatologicodoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }
  getAntPatologicoespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
}
