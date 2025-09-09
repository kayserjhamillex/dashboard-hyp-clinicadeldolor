import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { ListTestimonio } from '../models/listtest';

@Injectable({
  providedIn: 'root'
})
export class TestimonioService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/testimonio';
  }
  getTestimonios() {
    return this.http.get(`${this.apiUrl}`);
  }

  getTestimoniosbyCLiente(id: string | number) {
    return this.http.get(`${this.apiUrl}/bycliente/${id}`);
  }

  getTestimonio(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveTestimonio( testimonio: ListTestimonio) {
    return this.http.post(`${this.apiUrl}/create`, testimonio);
  }

  updateTestimonio(id: string|number, updatedTestimonio: ListTestimonio): Observable<ListTestimonio> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedTestimonio);
  }

  deleteTestimonio(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  deleteTestimonioCliente(id: string) {
    return this.http.delete(`${this.apiUrl}/clientedelete/${id}`);
  }

}
