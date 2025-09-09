import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Politica } from '../models/politica';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class PoliticaService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/politica';
  }
  getPoliticas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getPolitica(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deletePolitica(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  savePolitica( Politica: Politica) {
    return this.http.post(`${this.apiUrl}/create`, Politica);
  }

  updatePolitica(id: string|number, updatedPolitica: Politica): Observable<Politica> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedPolitica);
  }
}
