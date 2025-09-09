import { Title } from '@angular/platform-browser';

export interface Resultado {
  id?: number,
  Value?: boolean,
  Condition?: string,
  Detail?: string,
  CitaId?: number,
  ItemLaboratorioId?: number
}

export interface ResultadoDetail {
  id?: number,
  Value?: boolean,
  Condition?: string,
  Detail?: string,
  CitaId?: number,
  ItemLaboratorioId?: number,
  cita?: {
    id?: number,
    LaboratoryExam?: string
  },
  itemlaboratorio?: {
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
}
