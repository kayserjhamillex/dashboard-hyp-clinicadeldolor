import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Servicio } from '../models/servicio';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/servicio';
  }
  getServicios() {
    return this.http.get(`${this.apiUrl}`);
  }

  getServicio(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteServicio(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveServicio( Servicio: Servicio) {
    return this.http.post(`${this.apiUrl}/create`, Servicio);
  }

  updateServicio(id: string|number, updatedServicio: Servicio): Observable<Servicio> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedServicio);
  }
}
