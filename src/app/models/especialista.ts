import { Title } from '@angular/platform-browser';

export interface Especialista {
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
}
