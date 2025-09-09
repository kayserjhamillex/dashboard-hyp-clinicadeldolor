import { Title } from '@angular/platform-browser';

export interface Testimonio {
  id?: number,
  Testimony?: string,
  ClienteId?: number,
  cliente: {
    id?: number,
    Name?: string,
    LastName?: string,
    Photo?: string,
  },
}
