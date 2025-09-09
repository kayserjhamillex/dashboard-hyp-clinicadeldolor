import { Cita } from '../../models/Cita';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ListCita } from '../../models/listcita';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
  reservas: any = [];
  bandera = false;
  banderita = false;
  filtro = false;
  reservita: ListCita = {
    id: 0,
    Appointment: new Date(),
    Reason: '',
    Amount: '0',
    Pay: '0',
    Paymentstatus: '',
    Type: '',
    Condition: '',
    Referred: '',
    Companion: '',
    Relationship: '',
    BloodPressure: '',
    HeartRate: '',
    BreathingFrequency: '',
    Temperature: '',
    Saturation: '',
    SickTime: '',
    CurrentEpisode: '',
    StartWay: '',
    SignsandSymptoms: '',
    DescriptionProblem: '',
    SurgicalHistory: '',
    MedicalHistory: '',
    AllergicHistory: '',
    PhysicalExam: '',
    Diagnosis: '',
    LaboratoryExam: '',
    AdminId: 0,
    ClienteId: 0,
    HorarioId: 0
  };
  reservadetail: Cita = {
    id: 0,
    Appointment: new Date(),
    Pay: '',
    Type: '',
    Condition: '',
    Referred: '',
    Companion: '',
    Relationship: '',
    BloodPressure: '',
    HeartRate: '',
    BreathingFrequency: '',
    Temperature: '',
    Saturation: '',
    SickTime: '',
    CurrentEpisode: '',
    StartWay: '',
    SignsandSymptoms: '',
    DescriptionProblem: '',
    SurgicalHistory: '',
    MedicalHistory: '',
    AllergicHistory: '',
    PhysicalExam: '',
    Diagnosis: '',
    LaboratoryExam: '',
    AdminId: 0,
    ClienteId: 0,
    HorarioId: 0,
    admin: {
      id: 0,
      Name: '',
      LastName: '',
      Phone: '',
      Email: '',
      Photo: ''
    },
    cliente: {
      id: 0,
      Name: '',
      LastName: '',
      BirthDate: new Date(),
      Job: '',
      Direction: '',
      Phone: '',
      Gender: '',
      CivilStatus: '',
      DocumentNumber: '',
      Email: '',
      Photo: ''
    },
    horario: {
      id: 0,
      Day: '',
      Cupo: 0,
      EspecialistaId: 0,
      HoraId: 0,
      especialista: {
        id: 0,
        Turn: '',
        EspecialidadId: 0,
        DoctorId: 0,
        especialidad: {
          id: 0,
          Name: '',
          Price: 0
        },
        doctor: {
          id: 0,
          Name: '',
          LastName: '',
          Email: '',
        },
      },
      hora: {
        id: 0,
        Turn: '',
        Interval: '',
        Start: '',
        End: ''
      }
    }
  };
  ticket: any = this.reservadetail;
  mensaje1: any;
  codigoreserva: any;
  fecha: Date | undefined;
  fechamin: Date | undefined;
  fechamax: Date | undefined;
  stringmax: any;
  stringmin: any;
  fechastringvalue: any
  hoystring: any;
  fechahoystringvalue: any;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toast: ToastrService,
    private reservaService: CitaService
  ) { }

  ngOnInit(): void {
    this.fechamin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this.fechamax = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    this.stringmin = this.pd.transform(this.fechamin, 'yyyy-MM-dd');
    this.stringmax = this.pd.transform(this.fechamax, 'yyyy-MM-dd');
    this.filtrohoy();
    const fechahoy = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const fechahoystringvalue = fechahoy.toISOString().split('T')[0];
    this.reservaService.getHome(fechahoystringvalue).subscribe(
      rescitashoy => {
        console.log(rescitashoy);
        if (Object.entries(rescitashoy).length > 0) {
          this.filtro = true;
          this.toast.info('Citas de hoy');
          this.reservas = rescitashoy;
          this.bandera = true;
        } else {
          this.bandera = false;
          this.filtro = false;
        }
      }, err => {
        this.toast.error('Error Api Citas Home');
      }
    );
  }

  filtrohoy() {
    const fechita = new Date();
    this.hoystring = fechita.toISOString().split('T')[0];
  }
  getreservas() {
    const datito: any = this.fecha;
    const fechita = new Date(datito);
    this.fechastringvalue = fechita.toISOString().split('T')[0];
    if (this.fechastringvalue === this.hoystring) {
      this.filtro = true;
      console.log('la fecha es hoy');
    } else {
      this.filtro = false;
    }
    this.reservaService.getHome(this.fechastringvalue).subscribe(
      rescitas => {
        console.log(rescitas);
        if (Object.entries(rescitas).length > 0) {
          this.toast.info('Citas de la fecha elegida');
          this.reservas = rescitas;
          this.bandera = true;
        } else {
          this.bandera = false;
        }
      }, err => {
        this.toast.error('Error Api Citas Home');
      }
    );
  }

  detail(codigo: any) {
    this.reservaService.getCita(codigo).subscribe(
      rescita => {
        if (rescita !== null) {
          this.reservita = rescita;
          this.ticket = rescita;
          this.banderita = true;
          this.codigoreserva = this.reservita.id;
          this.toast.success('Detalles de la Cita');
        } else {
          this.banderita = false;
          this.toast.error('datos no obtenidos de la reserva');
        }
      }
    );
  }
  novino() {
    const elcodigo = this.codigoreserva;
    // decidir estado
    this.reservita.Condition = 'no vino';
    this.reservaService.updateCita(elcodigo, this.reservita).subscribe(
      resupdatereserva => {
        if (resupdatereserva) {
          this.mensaje1 = resupdatereserva;
          window.location.reload();
        }
      },
      err => {
        console.log('error al actualizar');
      }
    );
  }
  completado() {
    const elcodigo = this.codigoreserva;
    // decidir estado
    this.reservita.Condition = 'por atender';
    this.reservaService.updateCita(elcodigo, this.reservita).subscribe(
      resupdatereserva => {
        if (resupdatereserva) {
          this.mensaje1 = resupdatereserva;
          window.location.reload();
        }
      },
      err => {
        console.log('error al actualizar');
      }
    );
  }
  cambiartipo(newtipo: any) {
    const elcodigo = this.codigoreserva;
    this.reservaService.getCita(elcodigo).subscribe(
      rescita => {
        if (rescita !== null) {
          this.reservita = rescita;
          this.ticket = rescita;
          this.banderita = true;
          this.codigoreserva = this.reservita.id;
          this.toast.info('Cambiando de tipo');
          this.reservita = newtipo;
          this.reservaService.updateCita(elcodigo, this.reservita).subscribe(
            resupdatereserva => {
              if (resupdatereserva) {
                this.mensaje1 = resupdatereserva;
                window.location.reload();
              }
            },
            err => {
              console.log('error al actualizar');
            }
          );
        } else {
          this.banderita = false;
          this.toast.error('datos no obtenidos de la reserva');
        }
      }
    );
  }
}

