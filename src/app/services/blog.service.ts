import { Observable } from 'rxjs';
import { Blog } from '../models/blog';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/blog';
  }
  getBlogs() {
    return this.http.get(`${this.apiUrl}`);
  }

  getBlog(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteBlog(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveBlog( Blog: Blog) {
    return this.http.post(`${this.apiUrl}/create`, Blog);
  }

  updateBlog(id: string|number, updatedBlog: Blog): Observable<Blog> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedBlog);
  }
}
