import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../../models/admin';
import { Cita } from '../../../../models/Cita';
import { ListCita } from '../../../../models/listcita';
import { AdminService } from '../../../../services/admin.service';
import { CitaService } from '../../../../services/cita.service';
import { HorarioService } from '../../../../services/horario.service';

@Component({
  selector: 'app-subproceso2',
  standalone: true,
  imports: [],
  templateUrl: './subproceso2.component.html',
  styleUrl: './subproceso2.component.css'
})
export default class Subproceso2Component implements OnInit {
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
reserva1: ListCita = {
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
detailreserva: Cita = {
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
ticket: any = this.detailreserva;
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
horario: any = [];
horariofiltrado: any = [];
reservas: any = [];
reservasdia: any = [];
filtrada: any = [];
filtro1horario: any = [];
filtro2horario: any = [];
numerofecha = new Date().getTime();
dia: any;
numerocliente: any;
codigoespecialista: any;
codigoreserva: any;
mensaje: any = [];
mensajito: any;
lasreservas: any = [];
seleccionados: any = [];
// pago = 0;
indices: any = [];
check = false;
reservado = false;
botones = true;
lomismo = false;
cambiar = false;
conflicto = false;
banderadia = false;
banderatarde = false;
bandera = false;
itemsigualito: any = [];
larespuesta: any;
larespuestaitem: any;
elmensaje: any;
sepago: any;
constructor(
  private router: Router,
  private toastr: ToastrService,
  private adminService: AdminService,
  private reservaService: CitaService,
  private horarioService: HorarioService,
  private activatedRoute: ActivatedRoute,
  ) { }

// tslint:disable-next-line: typedef
locambio() {
  this.cambiar = true;
  this.botones = false;
}

// tslint:disable-next-line: typedef
hayconflicto() {
  this.cambiar = true;
  this.lomismo = false;
}

ngOnInit(): void {
  // para sacar el codigo del admin jejeje
  // tslint:disable-next-line: deprecation
  this.adminService.client$.subscribe(
    res => {
      if (res) {
        this.admin = res;
        this.codigoadmin = this.admin.id;
      }
    }
  );
  // tslint:disable-next-line: radix
  const codigito: any = this.activatedRoute.snapshot.paramMap.get('id');
  const codigo = parseInt(codigito);
  this.codigoreserva = codigo.toString();
  console.log(`codigo de la reserva: ${this.codigoreserva}`);
  const fechita: any = this.activatedRoute.snapshot.paramMap.get('fecha');
  const lafecha = new Date(fechita);
  // const lafechita = new Date(fechita);
  const diasemanal = lafecha.getDay();
  const dias =
  [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo'
  ];
  const namedia = dias[diasemanal];
  // const parametro = codigo;
  const lafechita: any = fechita;
  console.log(namedia);
  this.reservaService.getCita(this.codigoreserva).subscribe(
    rescita => {
      this.reserva = rescita;
      this.ticket = rescita;
      const parametro = this.ticket.horario.EspecialistaId;
      this.reservaService.getDisponibilidad(lafechita, parametro).subscribe(
        reservas1 => {
          this.reservasdia = reservas1;
          console.log(this.reservasdia);
          this.horarioService.getHorarioEspecialidaddDia(namedia, parametro).subscribe(
            disponibilidad => {
              this.horario = disponibilidad;
              if (Object.entries(this.reservasdia).length > 0) {
                const array1 = this.reservasdia;
                const array2 = this.horario;
                const filtrado: any = [];
                for (const item of array2) {
                  const codigohorario = item.id;
                  for (const obj of array1) {
                    const codigofiltrar = obj.HorarioId;
                    if (codigohorario === codigofiltrar) {
                      filtrado.push(item);
                      this.filtrada = filtrado;
                    }
                  }
                }
                const array3 = this.filtrada;
                // eliminamos la coincidencia entre los array
                const respuesta = array2.filter((alv: any) => !array3.includes(alv));
                this.horariofiltrado = respuesta;
              } else if (Object.entries(this.reservasdia).length === 0) {
                this.horariofiltrado = this.horario;
              }
              console.log(this.horariofiltrado);
              // aca filtramos los turnos
              const arraycito = this.horariofiltrado;
              const filtro1: any = [];
              const filtro2: any = [];
              const parametro1 = 'mañana';
              const parametro2 = 'tarde';
              for (const obj of arraycito) {
                const par = obj.hora.Turn;
                if (par === parametro1) {
                  filtro1.push(obj);
                  this.filtro1horario = filtro1;
                } else if (par === parametro2) {
                  filtro2.push(obj);
                  this.filtro2horario = filtro2;
                }
              }
              if (Object.entries(this.filtro1horario).length > 0) {
                this.banderadia = true;
              }
              if (Object.entries(this.filtro2horario).length > 0) {
                this.banderatarde = true;
              }
              this.bandera = true;
              this.toastr.info('Horario del especialista Elegido');
            },
            err => {
              console.log(err);
            }
          );
        }
      );
    }
  );
}

// tslint:disable-next-line: typedef
igual() {
  this.lomismo = true;
  this.botones = false;
  let filtro = 0;
  // tslint:disable-next-line: radix
  const fechita: any = this.activatedRoute.snapshot.paramMap.get('fecha');
  const fecha = fechita.toString();
  this.reserva.Appointment =  new Date(fecha);
  // this.reserva.Appointment = new Date(fechita + 'T00:00:00.000Z');
  const array1: any = this.horariofiltrado;
  console.log(array1);
  // console.log(this.ticket);
  console.log(this.reserva);
  const parametro =  this.ticket.horario.HoraId;
  for (const item of array1) {
    const filtrado = item.HoraId;
    console.log(parametro);
    console.log(filtrado);
    if (parametro === filtrado) {
      this.reserva.HorarioId = item.id;
      console.log('hay coincidencia');
      filtro = 1;
    }
  }
  if (filtro > 0) {
    console.log('entro en la condicion');
    this.conflicto = false;
    this.reserva.Condition = 'postergado';
    console.log(this.reserva);
    this.reservaService.updateCita(this.codigoreserva, this.reserva).subscribe(
      // tslint:disable-next-line: no-shadowed-variable
      resupcita => {
        this.larespuesta = resupcita;
        console.log(this.larespuesta);
        console.log('se actualizo la reserva');
        const parametrito =  this.codigoreserva;
        this.router.navigate(
          [
            'admin',
            'procesos',
            'proceso2',
            'subproceso3',
            parametrito
          ]
        );
        // this.reservaService.getSendpostpone(this.codigoreserva).subscribe(
        //   // tslint:disable-next-line: no-shadowed-variable
        //   ressendpost => {
        //     this.elmensaje = ressendpost;
        //     console.log('se envio el correo');
        //     this.router.navigate(
        //       [
        //         'admin',
        //         'procesos',
        //         'proceso2',
        //         'subproceso3',
        //         parametro
        //       ]
        //     );
        //   }
        // );
      }, err => {
        this.toastr.error('Error Api Postergacion');
      }
    );
  } else if (filtro === 0) {
    this.conflicto = true;
    this.toastr.info('El mismo horario se encuentra ocupado');
  }
}

// tslint:disable-next-line: typedef
postergar(codigo: any) {
  // this.reserva.Pay = this.pago.toString();
  this.reserva.Condition = 'postergado';
  this.reserva.HorarioId = codigo;
  // tslint:disable-next-line: radix
  const fechita: any = this.activatedRoute.snapshot.paramMap.get('fecha');
  const fecha = fechita.toString();
  this.reserva.Appointment =  new Date(fecha);
  this.reservaService.updateCita(this.codigoreserva, this.reserva).subscribe(
    // tslint:disable-next-line: no-shadowed-variable
    resupcita => {
      if (resupcita) {
        this.larespuesta = resupcita;
        console.log('se actualizo la reserva');
        const parametro =  this.codigoreserva;
        this.router.navigate(
          [
            'admin',
            'procesos',
            'proceso2',
            'subproceso3',
            parametro
          ]
        );
        // tslint:disable-next-line: deprecation
        // this.reservaService.getSendpostpone(this.codigoreserva).subscribe(
        //   // tslint:disable-next-line: no-shadowed-variable
        //   ressendpost => {
        //     this.elmensaje = ressendpost;
        //     console.log('se envio el correo');
        //     this.router.navigate(
        //       [
        //         'admin',
        //         'procesos',
        //         'proceso2',
        //         'subproceso3',
        //         parametro
        //       ]
        //     );
        //   }
        // );
      } else {
        this.toastr.error('no se pudo postergar');
      }
    }, err => {
      this.toastr.error('Error Api Postergacion');
    }
  );
}
}

