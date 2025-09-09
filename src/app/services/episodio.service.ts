import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Episodio } from '../models/episodio';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class EpisodioService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/episodio';
  }
  getEpisodios() {
    return this.http.get(`${this.apiUrl}`);
  }

  getEpisodio(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteEpisodio(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveEpisodio( Episodio: Episodio) {
    return this.http.post(`${this.apiUrl}/create`, Episodio);
  }

  updateEpisodio(id: string|number, updatedEpisodio: Episodio): Observable<Episodio> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedEpisodio);
  }
}
