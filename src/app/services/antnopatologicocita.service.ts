import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListAntNoPatologicoCita } from '../models/Listantnopatologicocita';

@Injectable({
  providedIn: 'root'
})
export class AntnopatologicocitaService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/antecedentenopatologicocita';
  }
  getAntNoPatologicoCitas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getAntNoPatologicoesCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/dolor/${codigo}`);
  }

  getAntNoPatologicoCita(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteAntNoPatologicoCita(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveAntNoPatologicoCita( antecedentecita: ListAntNoPatologicoCita) {
    return this.http.post(`${this.apiUrl}/create`, antecedentecita);
  }

  updateAntNoPatologicoCita(id: string|number, updatedantecedentecita: ListAntNoPatologicoCita): Observable<ListAntNoPatologicoCita> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedantecedentecita);
  }

  getAntNoPatologicocliente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cliente/${codigo}`);
  }
  getAntNoPatologicoadmin(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/admin/${codigo}`);
  }
  getAntNoPatologicodoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }
  getAntNoPatologicoespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
}
