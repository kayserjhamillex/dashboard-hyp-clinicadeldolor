import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { Cita } from '../../../../models/Cita';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../../services/cita.service';

@Component({
  selector: 'app-subproceso3',
  standalone: true,
  imports: [],
  templateUrl: './subproceso3.component.html',
  styleUrl: './subproceso3.component.css'
})
export default class Subproceso3Component implements OnInit {
  reserva: Cita = {
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
  ticket: any = this.reserva;
  elcodigo: any;
  lafecha: any;
  constructor(
    private toastr: ToastrService,
    private reservaService: CitaService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.reservaService.getCita(params["id"]).subscribe(
        res => {
          this.ticket = res;
          const codigo = this.ticket.id;
          const fecha: Date = new Date(this.ticket.Appointment);
          this.lafecha = fecha.toISOString().split('T')[0];
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
          this.toastr.success('su boleta');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
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

