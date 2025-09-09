import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ListCita } from '../models/listcita';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  apiUrlcita = '';
  apiUrlreserva = '';
  apiUrlpostergacion = '';

  constructor(
    private http: HttpClient,
    private wasa: GlobalService
    ) {
      this.apiUrlcita = this.wasa.apiUrlGlobal + '/cita';
      this.apiUrlreserva = this.wasa.apiUrlGlobal + '/gmailreserva';
      this.apiUrlpostergacion = this.wasa.apiUrlGlobal + '/gmail/postergar';
    }

  getCitas() {
    return this.http.get(`${this.apiUrlcita}`);
  }

  getCita(id: string) {
    return this.http.get(`${this.apiUrlcita}/${id}`);
  }
  gettopayCita() {
    return this.http.get(`${this.apiUrlcita}/search/topay`);
  }
  getCitaLabpay(id: string | number) {
    return this.http.get(`${this.apiUrlcita}/laboratorio/filtro/porpagar/${id}`);
  }
  getCitaLabrecepcion(id: string | number) {
    return this.http.get(`${this.apiUrlcita}/laboratorio/filtro/recepcion/${id}`);
  }
  getCitaLabresultado(id: string | number) {
    return this.http.get(`${this.apiUrlcita}/laboratorio/filtro/resultado/${id}`);
  }

  getDisponibilidad(lafecha: string, especialista: string | number) {
    return this.http.get(`${this.apiUrlcita}/disponibilidad/${lafecha}/${especialista}`);
  }

  getHome(lafecha: string) {
    return this.http.get(`${this.apiUrlcita}/home/${lafecha}`);
  }

  getBuy(lafecha: string) {
    return this.http.get(`${this.apiUrlcita}/pagos/${lafecha}`);
  }

  getClientBooking(codigoclient: string) {
    return this.http.get(`${this.apiUrlcita}/search/client/${codigoclient}`);
  }

  getCitasfiltradas(especialista: string) {
    return this.http.get(`${this.apiUrlcita}/filtrodoctor/estado/${especialista}`);
  }

  getCitasFiltro(dia: string, especialista: string) {
    return this.http.get(`${this.apiUrlcita}/filtrohorario/${dia}/${especialista}`);
  }

  getCitaestado() {
    return this.http.get(`${this.apiUrlcita}/filtro/estado`);
  }

  saveCita(cita: ListCita) {
    return this.http.post(`${this.apiUrlcita}/create`, cita);
  }

  updateCita(id: string|number, updatedCita: ListCita): Observable<ListCita> {
    return this.http.put(`${this.apiUrlcita}/update/${id}`, updatedCita);
  }

  getSendreservation(
    codigo: string) {
    return this.http.get(`${this.apiUrlreserva}/${codigo}`);
  }

  getSendpostpone(
    codigo: string) {
    return this.http.get(`${this.apiUrlpostergacion}/${codigo}`);
  }

  deleteCita(id: string) {
    return this.http.delete(`${this.apiUrlcita}/${id}`);
  }

  deleteCitaCliente(id: string) {
    return this.http.delete(`${this.apiUrlcita}/clientedelete/${id}`);
  }

  getcitaadmin(codigo: string | number) {
    return this.http.get(`${this.apiUrlcita}/filtro/admin/${codigo}`);
  }
  getcitacliente(codigo: string | number) {
    return this.http.get(`${this.apiUrlcita}/filtro/cliente/${codigo}`);
  }
  getcitadoctor(codigo: string | number) {
    return this.http.get(`${this.apiUrlcita}/filtro/doctor/${codigo}`);
  }
  getcitaespecialidad(codigo: string | number) {
    return this.http.get(`${this.apiUrlcita}/filtro/especialidad/${codigo}`);
  }
}
