import { Doctor } from '../models/doctor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  client = new BehaviorSubject<any>(null);
  client$ = this.client.asObservable();
  apiUrl = '';
  apiUrldominio = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/doctor';
    this.apiUrldominio = this.wasa.apiUrlGlobal + '/live';
  }

  loggin(client: any) {
    const cli = JSON.stringify(client);
    this.client.next(client);
    localStorage.setItem('doctor', cli);
  }
  loggout() {
    this.client.next(null);
    localStorage.removeItem('doctor');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('doctor')) {
      console.log('hay Doctor');
      return true;
    } else {
      console.log('¿no hay Doctor');
      return false;
    }
  }

  getDoctors() {
    return this.http.get(`${this.apiUrl}`);
  }

  getDoctor(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteDoctor(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  saveDoctor(Doctor: Doctor) {
    return this.http.post(`${this.apiUrl}/create`, Doctor);
  }

  updateDoctor(id: string|number, updatedDoctor: Doctor): Observable<Doctor> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedDoctor);
  }
  getSearch(correo: string) {
    return this.http.get(`${this.apiUrl}/search/${correo}`);
  }
  getlogin(correo: string, contra: string) {
    return this.http.get(`${this.apiUrl}/login/${correo}/${contra}`);
  }
  getrecover(id: string | number) {
    return this.http.get(`${this.apiUrldominio}/recover/${id}`);
  }
  getcofirecover(codigo: string, id: string | number) {
    return this.http.get(`${this.apiUrl}/recover/${codigo}/${id}`);
  }
}
