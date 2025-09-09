import { Title } from '@angular/platform-browser';

export interface Laboratoriocita {
  id?: number,
  Value?: boolean,
  Condition?: string,
  Location?: string,
  Amount?: string,
  CitaId?: number,
  LaboratoriodosId?: number,
  cita?: {
    id?: number,
    LaboratoryExam?: string
  },
  laboratoriodos?: {
    id?: number,
    Name?: string,
    Price?: number,
    Plurality?: string,
    TipoId?: number,
    tipo?: {
      id?: number,
      Name?: string
    }
  }
}
