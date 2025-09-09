import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Cita } from '../../../../models/Cita';
import { ListCita } from '../../../../models/listcita';
import { CitaService } from '../../../../services/cita.service';

@Component({
  selector: 'app-subproceso2',
  standalone: true,
  imports: [],
  templateUrl: './subproceso2.component.html',
  styleUrl: './subproceso2.component.css'
})
export default class Subproceso2Component implements OnInit {
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
  fechaActual: any;
  mensaje: any;
  mensaje1: any;
  lositems: any = [];
  atencion = false;
  postergacion = false;
  codigoreserva: any;
  numerofecha: any;
  codigocancha: any;
  datito = new Date();
  elcodigo: any;
  cantidad = 0;
  dia: any;
  mes: any;
  anio: any;
  stringdia: any;
  stringmes: any;
  lafecha: any;
  fechamin: Date | undefined;
  fechamax: Date | undefined;
  stringmax: any;
  stringmin: any;
  fechita: any;
  porpagar = false;
  sinsignos = false;
  porpostergar = false;
  noregistrarsignos = true;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private reservaService: CitaService,
    private activatedRoute: ActivatedRoute,
  ) { }

  // tslint:disable-next-line: typedef
  enableatender() {
    this.atencion = true;
  }
  // tslint:disable-next-line: typedef
  enablepostergar() {
    this.postergacion = true;
  }

  ngOnInit(): void {
    this.fechamin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this.fechamax = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    this.stringmin = this.pd.transform(this.fechamin, 'yyyy-MM-dd');
    this.stringmax = this.pd.transform(this.fechamax, 'yyyy-MM-dd');
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.reservaService.getCita(params["id"]).subscribe(
        res => {
          this.ticket = res;
          this.reservita = res;
          const codigo = this.ticket.id;
          const fecha: Date = new Date(this.ticket.Appointment);
          this.lafecha = fecha.toISOString().split('T')[0];
          this.toastr.success('su ticket');
          const parametro1 = this.reservita.Condition;
          const parametro2 = this.reservita.Paymentstatus;
          if (parametro1 !== 'atendido') {
            this.sinsignos = true;
          }
          if (parametro2 === 'por pagar' || 'gratuito') {
            this.porpagar = true;
          }
          if (parametro1 === 'atendido' || 'postergado') {
            this.porpostergar = true;
          }
          // console.log(this.sinsignos,this.porpagar,this.porpostergar);

          // if (codigo < 10) {
          //   this.elcodigo = '00000' + codigo.toString();
          // } else if (codigo < 100) {
          //   this.elcodigo = '0000' + codigo.toString();
          // } else if (codigo < 1000) {
          //   this.elcodigo = '000' + codigo.toString();
          // } else if (codigo < 10000) {
          //   this.elcodigo = '00' + codigo.toString();
          // } else if (codigo < 100000) {
          //   this.elcodigo = '0' + codigo.toString();
          // } else {
          //   this.elcodigo = codigo.toString();
          // }
          this.codigoreserva = codigo;
        },
        err => console.log(err)
      );
    }
  }
  completado() {
    const elcodigo = this.codigoreserva;
    this.reservita.Condition = 'en espera';
    this.reservaService.updateCita(elcodigo, this.reservita).subscribe(
      resupdatereserva => {
        if (Object.entries(resupdatereserva).length > 0) {
          this.mensaje1 = resupdatereserva;
          this.router.navigate(
            [
              'admin',
              'home'
            ]
          );
        }
      },
      err => {
        console.log('error al actualizar');
      }
    );
  }

  seguirpostergando(fecha: any) {
    const estado = this.ticket.Condition;
    if (estado === 'reservado' || estado === 'no vino') {
      this.fechita = new Date(fecha);
      const parametro1 = this.codigoreserva;
      const parametro2 = this.fechita.toISOString().split('T')[0];
      this.toastr.info('Proseguir con la postergacion');
      this.router.navigate(
        [
          'admin',
          'procesos',
          'proceso2',
          'subproceso2',
          parametro1,
          parametro2
        ]
      );
    } else {
      this.toastr.warning('el cliente no puede realizar postergacion');
      this.toastr.info(`el estado es: ${estado}`);
    }
  }

  // proseguir() {
  //   const elcodigo = this.codigoreserva;
  //   this.reservita.Condition = 'en espera';
  //   this.reservaService.updateCita(elcodigo, this.reservita).subscribe(
  //     resupdatereserva => {
  //       if (resupdatereserva !== []) {
  //         this.mensaje1 = resupdatereserva;
  //         this.router.navigate(
  //           [
  //             'admin',
  //             'home'
  //           ]
  //         );
  //       }
  //     },
  //     err => {
  //       console.log('error al actualizar');
  //     }
  //   );
  // }

  // tslint:disable-next-line: typedef
  descargar() {
    const element: any = document.getElementById('parapdf');
    html2canvas(element).then(
      (canvas) => {
        const imgWidth = 208;
        // const pageheight = 295;
        const imgheight = canvas.height * imgWidth / canvas.width;
        const heightleft = imgheight;
        console.log(canvas);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, heightleft);
        pdf.save('boleta.pdf');
      }
    );
  }

}
