import { Title } from '@angular/platform-browser';

export interface Horario {
  id?: number,
  Day?: string,
  Cupo?: number,
  EspecialistaId?: number,
  HoraId?: number,
  especialista:{
    id?: number,
    Turn?: string,
    EspecialidadId?: number,
    DoctorId?: number,
    especialidad: {
      id?: number,
      Name?: string,
      Image?: string,
      Price?: number
    },
    doctor: {
      id?: number,
      Name?: string,
      LastName?: string,
      MedicalSchoolNumber?: string,
      Email?: string,
      Photo?: string
    },
  },
  hora:{
    id?: number,
    Turn?: string,
    Interval?: string,
    Start?: string,
    End?: string
  }
};
