import { Observable } from 'rxjs';
import { Chat } from '../models/chat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './variable.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl = '';
  constructor(
    private http: HttpClient,
    private wasa: GlobalService
  ) {
    this.apiUrl = this.wasa.apiUrlGlobal + '/chat';
  }
  getChats() {
    return this.http.get(`${this.apiUrl}`);
  }

  getAnswerChats() {
    return this.http.get(`${this.apiUrl}/responder/answeradmin`);
  }

  getChat(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getClientChat(codigo: string) {
    return this.http.get(`${this.apiUrl}/chat/${codigo}`);
  }

  deleteChat(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // tslint:disable-next-line: no-shadowed-variable
  saveChat( Chat: Chat) {
    return this.http.post(`${this.apiUrl}/create`, Chat);
  }

  updateChat(id: string|number, updatedChat: Chat): Observable<Chat> {
    return this.http.put(`${this.apiUrl}/update/${id}`, updatedChat);
  }



}
