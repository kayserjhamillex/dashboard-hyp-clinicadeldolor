import { Title } from '@angular/platform-browser';

export interface Antecedente {
  id?: number,
  Name?: string,
  TipoId?: number,
  tipo: {
    id?: number,
    Name?: string,
  },
}
