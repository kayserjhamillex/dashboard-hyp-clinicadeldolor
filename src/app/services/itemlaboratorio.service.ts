import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ItemLaboratorio } from '../models/itemlaboratorio';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ItemLaboratorioService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/itemlaboratorio';
  }
  getItemLaboratorios() {
    return this.http.get(`${this.apiUrl}`);
  }

  getItemLaboratorioCita(codigo: string | number) {
    return this.http.get(`${this.apiUrl}/laboratorio/${codigo}`);
  }

  getItemLaboratorio(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteItemLaboratorio(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveItemLaboratorio( ItemLaboratorio: ItemLaboratorio) {
    return this.http.post(`${this.apiUrl}/create`, ItemLaboratorio);
  }

  updateItemLaboratorio(id: string|number, updatedItemLaboratorio: ItemLaboratorio): Observable<ItemLaboratorio> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedItemLaboratorio);
  }

}
