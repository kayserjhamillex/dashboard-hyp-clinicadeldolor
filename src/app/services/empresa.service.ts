import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/empresa';
  }
  getEmpresas() {
    return this.http.get(`${this.apiUrl}`);
  }

  getEmpresa(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveEmpresa( Empresa: Empresa) {
    return this.http.post(`${this.apiUrl}/create`, Empresa);
  }

  updateEmpresa(id: string|number, updatedEmpresa: Empresa): Observable<Empresa> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedEmpresa);
  }
}
