import { Observable } from 'rxjs';
import { Tipo } from '../models/tipo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class TipodosService {
  apiUrl = '';
  apiUrlLaboratorio = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/tipodos';
    this.apiUrlLaboratorio = this.wasa.apiUrlGlobal + '/laboratoriodos';
  }
  getTipodoss() {
    return this.http.get(`${this.apiUrl}`);
  }

  getTipodos(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveTipodos( Tipodos: Tipo) {
    return this.http.post(`${this.apiUrl}/create`, Tipodos);
  }

  updateTipodos(id: string|number, updatedTipodos: Tipo): Observable<Tipo> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedTipodos);
  }

  deleteLaboratorioTipodos(id: string) {
    return this.http.delete(`${this.apiUrlLaboratorio}/Tipodosdelete/${id}`);
  }

  deleteTipodos(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
