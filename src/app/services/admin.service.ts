import { Admin } from '../models/admin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  client = new BehaviorSubject<any>(null);
  client$ = this.client.asObservable();
  apiUrl = '';
  apiUrldominio = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/admin';
    this.apiUrldominio = this.wasa.apiUrlGlobal + '/live';
  }

  loggin(client: any) {
    const cli = JSON.stringify(client);
    this.client.next(client);
    localStorage.setItem('admin', cli);
  }
  loggout() {
    this.client.next(null);
    localStorage.removeItem('admin');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('admin')) {
      console.log('hay admin');
      return true;
    } else {
      console.log('¿no hay admin');
      return false;
    }
  }

  getAdmins() {
    return this.http.get(`${this.apiUrl}`);
  }

  getAdmin(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteAdmin(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  saveAdmin(admin: Admin) {
    return this.http.post(`${this.apiUrl}/create`, admin);
  }

  updateAdmin(id: string|number, updatedAdmin: Admin): Observable<Admin> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedAdmin);
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
