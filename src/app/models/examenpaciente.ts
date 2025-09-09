import { Title } from '@angular/platform-browser';

export interface ExamenCita {
  id?: number,
  Burning?: boolean,
  Painfulcoldsensation?: boolean,
  Electricshocks?: boolean,
  Tingle?: boolean,
  Sensationofpinsandneedles?: boolean,
  Numbness?: boolean,
  Itch?: boolean,
  Hypoaesthesiatotouch?: boolean,
  Hypoaesthesiatopunctures?: boolean,
  Brushed?: boolean,
  Fecha?: Date,
  Punctuacion?: string,
  DetallecitaId?: number,
  detallecita: {
    Treatment?: string,
    Observations?: string,
    CitaId?: string,
    cita: {
      id?: number,
      Appointment?: Date,
      Type?: string,
      Condition?: string,
      Diagnosis?: string,
      LaboratoryExam?: string
    }
  }
}
