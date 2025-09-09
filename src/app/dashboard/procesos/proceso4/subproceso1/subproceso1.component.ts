import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cita } from '../../../../models/Cita';
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
  reserva: Cita = {
    id: 0,
    Appointment: new Date(),
    Reason: '',
    Amount: '',
    Pay: '',
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
  ticket: any = this.reserva;
  reservita: ListCita = {
    id: 0,
    Appointment: new Date(),
    Reason: '',
    Amount: '',
    Pay: '',
    Paymentstatus: '',
    Type: 'normal',
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
  lositems: any = [];
  mensaje: any;
  mensaje1: any;
  sebusco = false;
  dato = '';
  codigoreserva: any;
  dia: any;
  mes: any;
  anio: any;
  stringdia: any;
  stringmes: any;
  lafecha: any;
  porpagar = false;
  sinsignos = false;
  noregistrarsignos = true;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private reservaService: CitaService,
  ) { }
  // tslint:disable-next-line: typedef
  buscar(codigito: any) {
    this.reservaService.getCita(codigito).subscribe(
      res => {
        console.log(res);
        this.ticket = res;
        this.reservita = res;
        const codigo = this.ticket.id;
        this.codigoreserva = codigo;
        this.toastr.success('su ticket');
        this.sebusco = true;
        const fecha: Date = new Date(this.ticket.Appointment);
        this.lafecha = fecha.toISOString().split('T')[0];
        const parametro1 = this.reservita.Condition;
        const parametro2 = this.reservita.Paymentstatus;
        if (parametro1 !== 'atendido') {
          this.sinsignos = true;
        }
        if (parametro2 === 'por pagar' || 'gratuito') {
          this.porpagar = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  completado() {
    const elcodigo = this.codigoreserva;
    this.reservita.Condition = 'en espera';
    this.reservaService.updateCita(elcodigo, this.reservita).subscribe(
      resupdatereserva => {
        this.mensaje1 = resupdatereserva;
        this.router.navigate(
          [
            'admin',
            'home'
          ]
        );
      },
      err => {
        console.log('error al actualizar');
      }
    );
  }
  ngOnInit(): void {
  }

}

