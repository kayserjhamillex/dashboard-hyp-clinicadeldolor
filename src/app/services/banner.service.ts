import { Observable } from 'rxjs';
import { Banner } from '../models/banner';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/banner';
  }
  getBanners() {
    return this.http.get(`${this.apiUrl}/active`);
  }

  getSelectBanners() {
    return this.http.get(`${this.apiUrl}`);
  }

  getBanner(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteBanner(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveBanner( Banner: Banner) {
    return this.http.post(`${this.apiUrl}/create`, Banner);
  }

  updateBanner(id: string|number, updatedBanner: Banner): Observable<Banner> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedBanner);
  }
}
