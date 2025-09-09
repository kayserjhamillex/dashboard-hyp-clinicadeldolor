import { Title } from '@angular/platform-browser';

export interface Historial {
  id?: number,
  Condition?: string,
  ClienteId?: number,
  AntecedenteId?: number,
  cliente: {
    id?: number,
    Name?: string,
    LastName?: string
  },
  antecedente: {
    id?: number,
    Name?: string,
    TipoId?: number,
    tipo: {
      id?: number,
      Name?: string
    },
  },
}
