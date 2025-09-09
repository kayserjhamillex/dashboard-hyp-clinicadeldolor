import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mensaje';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/mensaje';
  }
  getMensajes() {
    return this.http.get(`${this.apiUrl}`);
  }

  getMSSAnswers(codigo: string) {
    return this.http.get(`${this.apiUrl}/chat/${codigo}`);
  }

  getMensaje(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteMensaje(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveMensaje( Mensaje: Mensaje) {
    return this.http.post(`${this.apiUrl}/create`, Mensaje);
  }

  updateMensaje(id: string|number, updatedMensaje: Mensaje): Observable<Mensaje> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedMensaje);
  }
}
