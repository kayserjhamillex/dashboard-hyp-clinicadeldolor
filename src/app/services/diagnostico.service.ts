import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { Diagnostico } from '../models/diagnostico';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/diagnostico';
  }
  getDiagnosticos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getDiagnostico(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteDiagnostico(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveDiagnostico( Diagnostico: Diagnostico) {
    return this.http.post(`${this.apiUrl}/create`, Diagnostico);
  }

  updateDiagnostico(id: string|number, updatedDiagnostico: Diagnostico): Observable<Diagnostico> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedDiagnostico);
  }



}
