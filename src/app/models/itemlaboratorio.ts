import { Title } from '@angular/platform-browser';

export interface ItemLaboratorio {
  id?: number,
  Name?: string,
  Method?: string,
  Measurement?: string,
  ReferentialRange?: string,
  LaboratorioId?: number
}

export interface ItemLaboratorioDetail {
  id?: number,
  Name?: string,
  Method?: string,
  Measurement?: string,
  ReferentialRange?: string,
  LaboratorioId?: number,
  laboratorio?: {
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
}
