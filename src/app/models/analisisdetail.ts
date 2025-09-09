import { Title } from '@angular/platform-browser';

export interface Analisisdetail {
  id?: number,
  Value?: boolean,
  Condition?: string,
  CitaId?: number,
  LaboratorioId?: number,
  cita?: {
    id?: number,
    LaboratoryExam?: string
  },
  laboratorio?: {
    id?: number,
    Name?: string,
    Detail?: string,
    Price?: number,
    TipoId?: number,
    tipo?: {
      id?: number,
      Name?: string
    }
  }
}
