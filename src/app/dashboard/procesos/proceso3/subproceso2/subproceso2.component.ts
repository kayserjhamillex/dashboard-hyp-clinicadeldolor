import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../../models/admin';
import { Cliente } from '../../../../models/cliente';
import { Especialista } from '../../../../models/especialista';
import { ListCita } from '../../../../models/listcita';
import { AdminService } from '../../../../services/admin.service';
import { CitaService } from '../../../../services/cita.service';
import { ClienteService } from '../../../../services/cliente.service';
import { EspecialistaService } from '../../../../services/especialista.service';
import { HorarioService } from '../../../../services/horario.service';

@Component({
  selector: 'app-subproceso2',
  standalone: true,
  imports: [],
  templateUrl: './subproceso2.component.html',
  styleUrl: './subproceso2.component.css'
})
export default class Subproceso2Component implements OnInit {
  horario: any = [];
  horariofiltrado: any = [];
  hoy = new Date();
  numerodia: any;
  reservas: any = [];
  reservasdia: any = [];
  filtrada: any = [];
  numerofecha = new Date().getTime();
  dia: any;
  reserva: ListCita = {
    id: 0,
    Appointment: new Date(),
    Pay: '',
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
    AdminId: 0,
    ClienteId: 0,
    HorarioId: 0
  };
  reserva1: ListCita = {
    id: 0,
    Appointment: new Date(),
    Pay: '',
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
    AdminId: 0,
    ClienteId: 0,
    HorarioId: 0
  };
  numerocliente: any;
  codigoespecialista: any;
  codigoreserva: any;
  mensaje: any = [];
  mensajito: any;
  cliente: Cliente = {
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
    Password: '',
    Photo: '',
    Google: '0',
    Condition: '',
    Code: ''
  };
  cliente1: Cliente = {
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
    Password: '',
    Photo: '',
    Google: '0',
    Condition: '',
    Code: ''
  };
  especialistadetalle: Especialista = {
    id: 0,
    Turn: '',
    EspecialidadId: 0,
    DoctorId: 0,
    especialidad: {
      id: 0,
      Name: '',
      Image: '',
      Price: 0
    },
    doctor: {
      id: 0,
      Name: '',
      LastName: '',
      Email: '',
      Photo: ''
    }
  };
  detailespecialista: any = this.especialistadetalle;
  admin: Admin = {
    id: 0,
    Name: '',
    LastName: '',
    Phone: '',
    Email: '',
    Password: '',
    Condition: '',
    ConditionMin: '',
    Photo: '',
    Code: ''
  };
  codigoadmin: any;
  lasreservas: any = [];
  seleccionados: any = [];
  pago = 0;
  indices: any = [];
  check = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService,
    private reservaService: CitaService,
    private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private especialistaService: EspecialistaService,
  ) { }
  // tslint:disable-next-line: typedef
  fechadeldia() {
    const d = this.hoy.getDate();
    const m = this.hoy.getMonth() + 1;
    const yyyy = this.hoy.getFullYear();
    let dd: any;
    let mm: any;
    let pinshifecha: string;
    if (d < 10) {
      dd = '0' + d;
    } else {
      dd = d;
    }
    if (m < 10) {
      mm = '0' + m;
    } else {
      mm = m;
    }
    const cadena = yyyy + '-' + mm + '-' + dd;
    pinshifecha = cadena.toString();
    const a2 = new Date(pinshifecha).getTime();
    this.numerodia = a2;
  }
  ngOnInit(): void {
    this.fechadeldia();
    // para sacar el codigo del admin jejeje
    this.adminService.client$.subscribe(
      res => {
        if (res) {
          this.admin = res;
          this.codigoadmin = this.admin.id;
        }
      }
    );
    console.log(this.numerodia);
    // tslint:disable-next-line: radix
    const codigoespecialista1: any = this.activatedRoute.snapshot.paramMap.get('id');
    const codigoespecialista = parseInt(codigoespecialista1);
    this.codigoespecialista = codigoespecialista.toString();
    // tslint:disable-next-line: radix
    const cliente1: any = this.activatedRoute.snapshot.paramMap.get('cliente');
    const cliente = parseInt(cliente1);
    this.numerocliente = cliente;
    this.reserva.ClienteId = this.numerocliente;
    this.reserva.AdminId = this.codigoadmin;
    const lafecha = new Date(this.numerodia);
    const array =
          [
            'domingo',
            'lunes',
            'martes',
            'miercoles',
            'jueves',
            'viernes'
          ];
    const fechasa = lafecha.setDate(lafecha.getDate() + 1);
    const fechaselect = new Date(fechasa);
    const numerodia = fechaselect.getUTCDay() - 1;
    let nombredia = array[numerodia];
    if (numerodia === -1) {
      nombredia = 'sabado';
    }
    this.dia = nombredia;
    const eldia = this.dia;
    const fecha = this.numerodia;
    this.especialistaService.getEspecialista(this.codigoespecialista).subscribe(
      res => {
        if (res) {
          this.detailespecialista = res;
        }
      }
    );
    this.reservaService.getCitasFiltro(this.dia, this.codigoespecialista).subscribe(
      res => {
        this.reservas = res;
        const arrayreservas = this.reservas;
        const reservasfecha = [];
        for (const obj1 of arrayreservas) {
          const numfecha = new Date(obj1.reserva.FechaReserva).getTime();
          if (numfecha === fecha) {
            reservasfecha.push(obj1);
            this.reservasdia = reservasfecha;
          }
        }
        this.horarioService.getHorarioEspecialidaddDia(this.dia, this.codigoespecialista).subscribe(
          resp => {
            this.horario = resp;
            if (Object.entries(this.reservasdia).length > 0) {
              const array1 = this.reservasdia;
              const array2 = this.horario;
              const filtrado: any = [];
              for (const filtro1 of array2) {
                const codigohorario = filtro1.id;
                for (const filtro2 of array1) {
                  const codigofiltrar = filtro2.HorarioId;
                  if (codigohorario === codigofiltrar) {
                    filtrado.push(filtro1);
                    this.filtrada = filtrado;
                  }
                }
              }
              const array3 = this.filtrada;
              const respuesta = array2.filter((alv: any) => !array3.includes(alv));
              this.horariofiltrado = respuesta;
            } else if (Object.entries(this.reservasdia).length === 0) {
              this.horariofiltrado = this.horario;
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    );
  }
  reservar() {
    delete this.reserva.id;
    this.reserva.Pay = this.pago.toString();
    this.reserva.Condition = 'en espera';
    this.reserva.Appointment = new Date(this.numerodia);
    console.log(this.reserva);
    this.reservaService.saveCita(this.reserva).subscribe(
      res => {
        if (res) {
          this.reserva1 = res;
          this.codigoreserva = this.reserva1.id;
          this.finalizar();
          // poner de manera que espere el envio del correo a la creacion de los items
        } else {
          this.toastr.error('no se pudo crear la reserva');
        }
      }
    );
  }
  // tslint:disable-next-line: typedef
  finalizar() {
    const parametro = this.codigoreserva;
    // tslint:disable-next-line: deprecation
    this.reservaService.getSendreservation(parametro).subscribe(
      res => {
        if (res) {
          this.toastr.info('correo enviado satisfactoriamente');
          this.router.navigate(
            [
              'admin',
              'procesos',
              'proceso3',
              'subproceso3',
              parametro
            ]
          );
        } else {
          this.toastr.error('no se pudo enviar el correo');
        }
      }
    );
  }
}

