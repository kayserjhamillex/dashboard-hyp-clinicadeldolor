import { Observable } from 'rxjs';
import { Tipo } from '../models/tipo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  apiUrl = '';
  apiUrlLaboratorio = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/tipo';
    this.apiUrl = this.wasa.apiUrlGlobal + '/laboratorio';
  }
  getTipos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getTipo(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveTipo( Tipo: Tipo) {
    return this.http.post(`${this.apiUrl}/create`, Tipo);
  }

  updateTipo(id: string|number, updatedTipo: Tipo): Observable<Tipo> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedTipo);
  }

  deleteLaboratorioTipo(id: string) {
    return this.http.delete(`${this.apiUrlLaboratorio}/tipodelete/${id}`);
  }

  deleteTipo(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
