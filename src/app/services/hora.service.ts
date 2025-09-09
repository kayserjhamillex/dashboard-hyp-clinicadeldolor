import { Observable } from 'rxjs';
import { Hora } from '../models/hora';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class HoraService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/hora';
  }
  getHoras() {
    return this.http.get(`${this.apiUrl}`);
  }

  getHoraFilter(intervalo: string | number, turno: string | number) {
    return this.http.get(`${this.apiUrl}/interval/${intervalo}/${turno}`);
  }

  getHora(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteHora(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveHora( Hora: Hora) {
    return this.http.post(`${this.apiUrl}/create`, Hora);
  }

  updateHora(id: string|number, updatedHora: Hora): Observable<Hora> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedHora);
  }
}
