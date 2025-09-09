import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/live';
  }
  // reporte numero 1
  getconsolidado(fechastart: string, fechaend: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/report/consolidado/${fechastart}/${fechaend}`);
  }
  // reporte numero 2
  getflujo(fecha1: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/report/flujocaja/${fecha1}`);
  }

  // reporte numero 3
  getflujobetween(fecha1: string, fecha2: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/report/flujocajaentrefechas/${fecha1}/${fecha2}`);
  }

  // reporte numero 3
  // getgratis(fecha1: string, fecha2: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/reporte4/${fecha1}/${fecha2}`);
  // }
  // los demas reportes ...
}
