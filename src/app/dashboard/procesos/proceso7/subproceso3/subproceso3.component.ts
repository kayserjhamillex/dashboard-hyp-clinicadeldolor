import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cita } from '../../../../models/Cita';
import { ListCita } from '../../../../models/listcita';
import { CitaService } from '../../../../services/cita.service';

@Component({
  selector: 'app-subproceso3',
  standalone: true,
  imports: [],
  templateUrl: './subproceso3.component.html',
  styleUrl: './subproceso3.component.css'
})
export default class Subproceso3Component implements OnInit {
  reserva: ListCita = {
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
    Labamount: '',
    Labpay: '',
    Labpaymentstatus: '',
    Labstatus: '',
    AdminId: 0,
    ClienteId: 0,
    HorarioId: 0
  };
  reservadetail: Cita = {
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
  ticket: any = this.reservadetail;
  elcodigo: any;
  mensaje: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private reservaService: CitaService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.reservaService.getCita(params["id"]).subscribe(
        res => {
          this.reserva = res;
          this.ticket = res;
          this.elcodigo = this.ticket.id;
          this.toastr.success('su boleta');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  updateCita() {
    const codigoreserva = this.elcodigo;
    console.log(codigoreserva);
    console.log(this.reserva);
    this.reserva.Condition = 'en espera';
    this.reservaService.updateCita(this.elcodigo, this.reserva).subscribe(
      res => {
        this.mensaje = res;
        console.log(this.mensaje);
        this.router.navigate(
          [
            'admin',
            'procesos',
            'proceso7',
            'subproceso4',
            codigoreserva
          ]
        );
        this.toastr.success('Ver Ticket');
      }, err => {
        this.toastr.error('Error Api Actualizacion Cita');
      }
    );
  }

}

