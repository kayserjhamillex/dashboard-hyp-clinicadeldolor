import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public apiUrlGlobal = 'https://thebackendgrupohpsalud.jxdesignsolution.com';
  // public apiUrlGlobal = 'https://clinic-pain.herokuapp.com';
  constructor() {

  }
}
