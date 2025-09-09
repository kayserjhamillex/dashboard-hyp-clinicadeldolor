import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Cita } from '../../../../models/Cita';
import { Component, OnInit } from '@angular/core';
import { ListCita } from '../../../../models/listcita';
import { CitaService } from '../../../../services/cita.service';

@Component({
  selector: 'app-subproceso1',
  standalone: true,
  imports: [],
  templateUrl: './subproceso1.component.html',
  styleUrl: './subproceso1.component.css'
})
export default class Subproceso1Component implements OnInit {
  reservas: any = [];
  mensaje: any;
  bandera = false;
  reserva: ListCita = {
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
    Creatininevalue: '',
    Urea: '',
    ETS: false,
    Specifyothers: '',
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
    Creatininevalue: '',
    Urea: '',
    ETS: false,
    Specifyothers: '',
    Labamount: '',
    Labpay: '',
    Labpaymentstatus: '',
    Labstatus: '',
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
  codigoreserva: any;
  fecha: Date | undefined;
  fechamin: Date | undefined;
  fechamax: Date | undefined;
  stringmax: any;
  stringmin: any;
  fechastringvalue: any;
  hoystring: any;
  filtro = false;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toast: ToastrService,
    private reservaService: CitaService,
  ) { }
  // filtrohoy() {
  //   const fechita = new Date();
  //   this.hoystring = fechita.toISOString().split('T')[0];
  // }
  ngOnInit(): void {
    this.fechamin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this.fechamax = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    this.stringmin = this.pd.transform(this.fechamin, 'yyyy-MM-dd');
    this.stringmax = this.pd.transform(this.fechamax, 'yyyy-MM-dd');
    // this.filtrohoy();
    const fechahoy = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const fechahoystringvalue = fechahoy.toISOString().split('T')[0];
    this.hoystring = fechahoystringvalue;
    this.reservaService.getBuy(fechahoystringvalue).subscribe(
      resbuy => {
        this.reservas = resbuy;
        if (Object.entries(this.reservas).length > 0) {
          this.toast.info('Citas por pagar o gratuitas de hoy');
          this.bandera = true;
        } else {
          this.bandera = false;
        }
      }, err => {
        this.toast.error('Error api get buy cita');
      }
    );
  }
  detail(codigo: any) {
    this.reservaService.getCita(codigo).subscribe(
      rescita => {
        if (rescita !== null) {
          this.reserva = rescita;
          this.ticket = rescita;
          this.codigoreserva = this.reserva.id;
          this.toast.success('Procedamos a pagar');
        } else {
          this.toast.error('datos no obtenidos de la reserva');
        }
      }
    );
  }
  completado() {
    const elcodigo = this.codigoreserva;
    const pagoquito: any = this.reserva.Amount;
    const total1: any = this.reserva.Pay;
    const pago = +pagoquito;
    const total = +total1;
    if (pago < total) {
      this.reserva.Paymentstatus = 'por pagar';
    } else {
      this.reserva.Paymentstatus = 'pagado';
    }
    if ('0' === this.reserva.Amount && this.reserva.Pay) {
      this.reserva.Paymentstatus = 'gratuito';
    }
    this.reservaService.updateCita(elcodigo, this.reserva).subscribe(
      resupdatereserva => {
        if (resupdatereserva) {
          this.mensaje = resupdatereserva;
          window.location.reload();
        }
      },
      err => {
        console.log('error al actualizar');
      }
    );
  }
  getreservas() {
    const lafechita: any = this.fecha;
    const fechita = new Date(lafechita);
    this.fechastringvalue = fechita.toISOString().split('T')[0];
    if (this.fechastringvalue === this.hoystring) {
      this.filtro = true;
      console.log('la fecha es hoy');
    } else {
      this.filtro = false;
    }
    this.reservaService.getBuy(this.fechastringvalue).subscribe(
      rescitas => {
        console.log(rescitas);
        if (Object.entries(rescitas).length > 0) {
          this.toast.info('Citas por pagar o gratuitas de la fecha elegida');
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
}

