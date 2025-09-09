import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';
import { Tratamiento } from '../models/tratamiento';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/tratamiento';
  }
  getTratamientos() {
    return this.http.get(`${this.apiUrl}`);
  }

  getTratamiento(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteTratamiento(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveTratamiento( Tratamiento: Tratamiento) {
    return this.http.post(`${this.apiUrl}/create`, Tratamiento);
  }

  updateTratamiento(id: string|number, updatedTratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedTratamiento);
  }



}
