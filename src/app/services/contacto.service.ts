import { Injectable } from '@angular/core';
import { Contacto } from '../models/contacto';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/contacto';
  }
  getContactos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getContacto(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveContacto(Contacto: Contacto) {
    return this.http.post(`${this.apiUrl}/create`, Contacto);
  }

  deleteContacto(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // GetSendContact(id: string) {
  //   return this.http.get(`${this.apiUrl}/contacto/${id}`);
  // }

}
