import { Title } from '@angular/platform-browser';

export interface Laboratorio {
  id?: number,
  Name?: string,
  Detail?: string,
  Price?: number,
  TipoId?: number,
  tipo?: {
    id?: number,
    Name?: string,
  }
}
