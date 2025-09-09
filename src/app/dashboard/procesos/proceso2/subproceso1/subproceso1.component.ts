import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Cita } from '../../../../models/Cita';
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
  dato: any = '';
  boleta = false;
  datito = new Date();
  codigoreserva: any;
  fechita: any;
  fechaActual: any;
  items: any = [];
  codigocancha: any;
  elcodigo: any;
  lafecha: any;
  sebusco = false;
  fechamin: Date | undefined;
  fechamax: Date | undefined;
  stringmax: any;
  stringmin: any;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    // private itemService: ItemService,
    private reservaService: CitaService,
  ) { }
  // tslint:disable-next-line: typedef
  buscar(codigo: any) {
    const id = codigo.toString();
    this.reservaService.getCita(id).subscribe(
      res => {
        this.ticket = res;
        this.sebusco = true;
        this.boleta = true;
        this.codigoreserva = this.ticket.id;
        this.toastr.success('Reserva Encontrada');
        if (codigo < 10) {
          this.elcodigo = '00000' + codigo.toString();
        } else if (codigo < 100) {
          this.elcodigo = '0000' + codigo.toString();
        } else if (codigo < 1000) {
          this.elcodigo = '000' + codigo.toString();
        } else if (codigo < 10000) {
          this.elcodigo = '00' + codigo.toString();
        } else if (codigo < 100000) {
          this.elcodigo = '0' + codigo.toString();
        } else {
          this.elcodigo = codigo.toString();
        }
        const fecha: Date = new Date(this.ticket.Appointment);
        this.lafecha = fecha.toISOString().split('T')[0];
      },
      err => {
        this.toastr.error('Reserva no Encontrada');
      }
    );
  }
  // tslint:disable-next-line: typedef
  postergar(fecha: any) {
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
  // tslint:disable-next-line: typedef
  sumarDias(fecha: any, dia: any) {
    fecha.setDate(fecha.getDate() + dia);
    const dd = fecha.getDate();
    const mm = fecha.getMonth() + 1; // As January is 0.
    const yyyy = fecha.getFullYear();
    let returnDate = '';
    returnDate += yyyy;
    if (mm < 10) {
      returnDate += `-0${mm}`;
      } else {
      returnDate += `-${mm}`;
      }

    if (dd < 10) {
    returnDate += `-0${dd}`;
    } else {
    returnDate += `-${dd}`;
    }
    return returnDate;
  }
  // tslint:disable-next-line: typedef
  getNowDate() {
    const fecha = new Date();
    const today = new Date();
    // return returnDate;
    const d = new Date(today);
    // this.sumarDias(returnDate)
    return this.sumarDias(d, 1);
  }
  ngOnInit(): void {
    this.fechamin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this.fechamax = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    this.stringmin = this.pd.transform(this.fechamin, 'yyyy-MM-dd');
    this.stringmax = this.pd.transform(this.fechamax, 'yyyy-MM-dd');
    this.fechaActual = this.getNowDate();
  }

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

