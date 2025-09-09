import { Title } from '@angular/platform-browser';

export interface Comentario {
  id?: number,
  Comment?: string,
  BlogId?: number,
  ClienteId?: number,
  blog: {
    id?: number,
    Title?: string,
  },
  cliente: {
    id?: number,
    Name?: string,
    LastName?: string,
    Photo?: string,
  },
}
