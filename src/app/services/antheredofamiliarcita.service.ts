import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListAntNoPatologicoCita } from '../models/Listantnopatologicocita';

@Injectable({
  providedIn: 'root'
})
export class AntheredofamiliarcitaService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/antecedenteheredofamiliarcita';
  }
  getAntHeredoFamiliarCitas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getAntHeredoFamiliaresCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/dolor/${codigo}`);
  }

  getAntHeredoFamiliarCita(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteAntHeredoFamiliarCita(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveAntHeredoFamiliarCita( antecedentecita: ListAntNoPatologicoCita) {
    return this.http.post(`${this.apiUrl}/create`, antecedentecita);
  }

  updateAntHeredoFamiliarCita(id: string|number, updatedantecedentecita: ListAntNoPatologicoCita): Observable<ListAntNoPatologicoCita> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedantecedentecita);
  }

  getAntHeredoFamiliarcliente(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/cliente/${codigo}`);
  }
  getAntHeredoFamiliaradmin(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/admin/${codigo}`);
  }
  getAntHeredoFamiliardoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/doctor/${codigo}`);
  }
  getAntHeredoFamiliarespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/filtro/especialidad/${codigo}`);
  }
}
