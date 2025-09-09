// import { Observable } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { GlobalService } from './variable.service';
// import { ListAntecedente } from '../models/listantecedente';

// @Injectable({
//   providedIn: 'root'
// })
// export class AntecedenteService {
//   apiUrl = this.wasa.apiUrlGlobal + '/antecedente';
//   constructor(
//     private http: HttpClient,
//     private wasa: GlobalService
//   ) { }
//   getAntecedentes() {
//     return this.http.get(`${this.apiUrl}`);
//   }

//   getAntecedenteTipo(tipo: string) {
//     return this.http.get(`${this.apiUrl}/filtro/${tipo}`);
//   }

//   getAntecedente(id: string) {
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }

//   deleteAntecedente(id: string) {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   // tslint:disable-next-line: no-shadowed-variable
//   saveAntecedente( Antecedente: ListAntecedente) {
//     return this.http.post(`${this.apiUrl}/create`, Antecedente);
//   }

//   updateAntecedente(id: string|number, updatedAntecedente: ListAntecedente): Observable<ListAntecedente> {
//     return this.http.put(`${this.apiUrl}/update/${id}`, updatedAntecedente);
//   }
// }
