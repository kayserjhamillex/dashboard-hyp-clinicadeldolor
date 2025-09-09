import { Title } from '@angular/platform-browser';

export interface Chatmodel {
  id?: number,
  CreationDate?: Date,
  Condition?: string,
  AdminId?: number,
  ClienteId?: number,
  admin?: {
    id?: number,
    Name?: string,
    LastName?: string,
    Photo?: string
  },
  cliente?: {
    id?: number,
    Name?: string,
    LastName?: string,
    Photo?: string,
    Phone?: string
  }
}
