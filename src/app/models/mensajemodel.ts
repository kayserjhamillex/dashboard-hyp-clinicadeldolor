import { Title } from '@angular/platform-browser';

export interface Mensajemodel {
  id?: number,
  SendDate?: Date,
  Message?: string,
  Direction?: string,
  ChatId?: number,
  chat?: {
    id?: number,
    CreationDate?: Date,
    Condition?: string,
    AdminId?: number,
    ClienteId?: number,
    cliente?: {
      id?: number,
      Name?: string,
      LastName?: string,
      Photo?: string
    }
  }
}
