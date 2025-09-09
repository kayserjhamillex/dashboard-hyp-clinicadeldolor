import { Observable } from 'rxjs';
import { Coment } from '../models/coment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/comentario';
  }
  getComentarios() {
    return this.http.get(`${this.apiUrl}`);
  }

  getComentariosbyBlog(codigo: string) {
    return this.http.get(`${this.apiUrl}/byblog/${codigo}`);
  }

  getComentariosbyCliente(codigo: string) {
    return this.http.get(`${this.apiUrl}/bycliente/${codigo}`);
  }

  getComentario(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveComentario( comentario: Coment) {
    return this.http.post(`${this.apiUrl}/create`, comentario);
  }

  updateComentario(id: string|number, updatedcomentario: Coment): Observable<Coment> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedcomentario);
  }

  deleteComentario(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  deleteComentarioCliente(id: string) {
    return this.http.delete(`${this.apiUrl}/clientedelete/${id}`);
  }

}
