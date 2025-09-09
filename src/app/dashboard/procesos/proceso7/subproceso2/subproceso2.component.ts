import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../../models/admin';
import { Cliente } from '../../../../models/cliente';
import { Genero } from '../../../../models/genero.model';
import { Horario } from '../../../../models/horario';
import { ListCita } from '../../../../models/listcita';
import { ListDermatomaFrontal } from '../../../../models/listdermatomafrontal';
import { ListDermatomaPosterior } from '../../../../models/listdermatomaposterior';
import { ListDetalleCita } from '../../../../models/Listdetallecita';
import { ListExamenCita } from '../../../../models/listexamenpaciente';
import { ListHorario } from '../../../../models/listhorario';
import { AnalisisService } from '../../../../services/analisis.service';
import { CitaService } from '../../../../services/cita.service';
import { ClienteService } from '../../../../services/cliente.service';
import { DermatomafrontalService } from '../../../../services/dermatomafrontal.service';
import { DermatomaposteriorService } from '../../../../services/dermatomaposterior.service';
import { DetallecitacitaService } from '../../../../services/detallecitacita.service';
import { ExamencitaService } from '../../../../services/examencita.service';
import { HorarioService } from '../../../../services/horario.service';
import { LaboratorioService } from '../../../../services/laboratorio.service';
import { LaboratoriodosService } from '../../../../services/laboratoriodos.service';
import { LaboratoriodoscitaService } from '../../../../services/laboratoriodoscita.service';

@Component({
  selector: 'app-subproceso2',
  standalone: true,
  imports: [],
  templateUrl: './subproceso2.component.html',
  styleUrl: './subproceso2.component.css'
})
export default class Subproceso2Component implements OnInit {
  detallecita: ListDetalleCita = {
    Othersduration: '',
    Startdate: new Date(),
    Frequency: '',
    Datethatbecameimportant: new Date(),
    Perday: '',
    Perweek: '',
    Permonth: '',
    Byyear: '',
    One: false,
    Two: false,
    Three: false,
    Multiple: false,
    Unilateral: false,
    Bilateral: false,
    Symmetrical: false,
    Referred: false,
    Irradiated: false,
    Worsened: false,
    Parked: false,
    Decreasing: false,
    Scale: '',
    Datescale: new Date(),
    Oncological: false,
    Oncologicaltype: '',
    AssociatedwithDiagnosis: false,
    AssociatedwithTreatment: false,
    AssociatedwithProgressiveCancer: false,
    Addictions: false,
    Dying: false,
    Treatment: '',
    Observations: '',
    Protocol: false,
    Protocoltype: '',
    CitaId: 0
  };
  frontbody: ListDermatomaFrontal = {
    DFC1: false,
    DFC21: false,
    DFC22: false,
    DFC3: false,
    DFC4: false,
    DFC51: false,
    DFC52: false,
    DFC61: false,
    DFC62: false,
    DFC71: false,
    DFC72: false,
    DFC81: false,
    DFC82: false,
    DFD101: false,
    DFD102: false,
    DFD103: false,
    DFD2: false,
    DFD3: false,
    DFD4: false,
    DFD5: false,
    DFD6: false,
    DFD7: false,
    DFD8: false,
    DFD9: false,
    DFD10: false,
    DFD11: false,
    DFD12: false,
    DFL1: false,
    DFL21: false,
    DFL22: false,
    DFL31: false,
    DFL32: false,
    DFL41: false,
    DFL42: false,
    DFL51: false,
    DFL52: false,
    DFS11: false,
    DFS12: false,
    DFS2: false,
    DFS3: false,
    CitaId: 0
  };
  endbody: ListDermatomaPosterior = {
    DDC2: false,
    DDC3: false,
    DDC4: false,
    DDC51: false,
    DDC52: false,
    DDC53: false,
    DDC61: false,
    DDC62: false,
    DDC63: false,
    DDC71: false,
    DDC72: false,
    DDC73: false,
    DDC81: false,
    DDC82: false,
    DDC83: false,
    DDD101: false,
    DDD102: false,
    DDD103: false,
    DDD2: false,
    DDD3: false,
    DDD4: false,
    DDD5: false,
    DDD6: false,
    DDD7: false,
    DDD8: false,
    DDD9: false,
    DDD10: false,
    DDD11: false,
    DDD12: false,
    DDL1: false,
    DDL2: false,
    DDL31: false,
    DDL32: false,
    DDL41: false,
    DDL42: false,
    DDL51: false,
    DDL52: false,
    DDL53: false,
    DDL54: false,
    DDS11: false,
    DDS12: false,
    DDS13: false,
    DDS14: false,
    DDS21: false,
    DDS22: false,
    DDS3: false,
    DDS4: false,
    DDS5: false,
    CitaId: 0
  };
  entrevista: ListExamenCita = {
    Burning: false,
    Painfulcoldsensation: false,
    Electricshocks: false,
    Tingle: false,
    Sensationofpinsandneedles: false,
    Numbness: false,
    Itch: false,
    Hypoaesthesiatotouch: false,
    Hypoaesthesiatopunctures: false,
    Brushed: false,
    Fecha: new Date(),
    Punctuacion: '',
    DetallecitaId: 0
  };
  usuario: Admin = {
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
    Photo: 'https://res.cloudinary.com/jx-design/image/upload/v1646961616/Foto/xiv8ojpbhxyvs3knjtg0.jpg',
    Google: '0',
    Condition: 'desactivado',
    Code: '99999999',
    G: '',
    P: '',
    A: '',
    C: '',
    Fum: new Date(),
    Papsmear: '',
    Bloodtype: '',
    Others: '',
    Othershereditary: '',
    Otherspathological: '',
    Medicine: ''
  };
  dato: any = '';
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
    Google: '',
    Condition: '',
    Code: ''
  };
  botones = true;
  buscar = false;
  crear = false;
  datoscliente = false;
  genero: Genero [] = [
    {
      id: 1,
      name: 'Masculino'
    },
    {
      id: 2,
      name: 'Femenino'
    }
  ];
  tipo: Genero [] = [
    {
      id: 1,
      name: 'normal'
    },
    {
      id: 2,
      name: 'medicina del dolor'
    },
    {
      id: 3,
      name: 'procedimiento'
    }
  ];
  estado: Genero [] = [
    {
      id: 1,
      name: 'reservado'
    },
    {
      id: 2,
      name: 'atencion'
    }
  ];
  estadocivil: Genero [] = [
    {
      id: 1,
      name: 'Soltero'
    },
    {
      id: 2,
      name: 'Casado'
    },
    {
      id: 3,
      name: 'Divorciado'
    },
    {
      id: 4,
      name: 'Viudo'
    },
    {
      id: 5,
      name: 'Concubinato'
    },
    {
      id: 6,
      name: 'Separación en proceso'
    },
    {
      id: 7,
      name: 'Separado'
    }
  ];
  hombre = 'https://res.cloudinary.com/jx-design/image/upload/v1648169965/Foto/zsvozr0bufvjujb72p9e.jpg';
  mujer = 'https://res.cloudinary.com/jx-design/image/upload/v1648170120/Foto/qukeq97u2cebdmqpqyua.jpg';
  codigocliente: any = 0;
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
    Labamount: '',
    Labpay: '',
    Labpaymentstatus: '',
    Labstatus: '',
    Labreceptiondate: new Date(),
    Labresultdate: new Date(),
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
    Labreceptiondate: new Date(),
    Labresultdate: new Date(),
    AdminId: 0,
    ClienteId: 0,
    HorarioId: 0
  };
  horario: ListHorario = {
    id: 0,
    Day: '',
    Cupo: 0,
    EspecialistaId: 0,
    HoraId: 0,
  };
  horariodetail: Horario = {
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
        Image: '',
        Price: 0
      },
      doctor: {
        id: 0,
        Name: '',
        LastName: '',
        MedicalSchoolNumber: '',
        Email: '',
        Photo: ''
      },
    },
    hora: {
      id: 0,
      Turn: '',
      Interval: '',
      Start: '',
      End: ''
    }
  };
  detailhorario: any = this.horariodetail;
  resultado: any;
  resultado2: any;
  resultado3: any;
  resultado4: any;
  cantidadanalisis: any;
  cantidadrxtmrm: any;
  laboratorios: any = [];
  laboratoriosdos: any = [];
  laboratorioscita: any = [];
  laboratoriosdoscita: any = [];
  banderapro = false;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private reservaService: CitaService,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private horarioService: HorarioService,
    private analisisService: AnalisisService,
    private examencitaService: ExamencitaService,
    private laboratorioService: LaboratorioService,
    private detallecitaService: DetallecitacitaService,
    private laboratoriodosService: LaboratoriodosService,
    private dermatomafrontalService: DermatomafrontalService,
    private laboratoriodoscitaService: LaboratoriodoscitaService,
    private dermatomaposteriorService: DermatomaposteriorService,
  ) { }
  getcantidad() {
    this.laboratorioService.getLaboratorios().subscribe(
      res => {
        this.laboratorios = res;
        this.cantidadanalisis = Object.entries(this.laboratorios).length;
      }, err => {
        this.toastr.error('Error get laboratorios');
      }
    );
    this.laboratoriodosService.getLaboratorios().subscribe(
      res => {
        this.laboratoriosdos = res;
        this.cantidadrxtmrm = Object.entries(this.laboratoriosdos).length;
      }, err => {
        this.toastr.error('Error get laboratoriosdos');
      }
    );
  }
  onOptionsSelected(event: any) {
    const value = event.target.value;
    this.cliente.Gender = value;
    console.log(value);
  }
  onOptionsSelectedType(event: any) {
    const value = event.target.value;
    this.reserva.Type = value;
    if (value === 'procedimiento') {
      this.banderapro = true;
    } else {
      this.banderapro = false;
    }
    console.log(value);
  }
  onOptionsSelectedStatus(event: any) {
    const value = event.target.value;
    this.cliente.CivilStatus = value;
    console.log(value);
  }
  buscarcliente() {
    this.buscar = true;
    this.botones = false;
  }
  // tslint:disable-next-line: typedef
  crearcliente() {
    this.crear = true;
    this.botones = false;
  }
  saveCliente() {
    this.cliente.Fum = this.cliente.BirthDate;
    if (this.cliente.Gender === 'Masculino') {
      this.cliente.Photo = this.hombre;
    } else if (this.cliente.Gender === 'Femenino') {
      this.cliente.Photo = this.mujer;
    }
    delete this.cliente.id;
    this.cliente.Password = this.cliente.DocumentNumber;
    console.log(this.cliente);
    this.clienteService.saveCliente(this.cliente).subscribe(
      res => {
        this.cliente1 = res;
        this.codigocliente = this.cliente1.id;
        this.toastr.success('Nuevo cliente creado');
        this.datoscliente = true;
        this.crear = false;
      },
      err => {
        this.toastr.error('no se pudo crear un nuevo cliente');
      }
    );
  }
  searchEmailCliente() {
    this.clienteService.getClientecorreo(this.dato).subscribe(
      res => {
        this.cliente1 = res;
        this.codigocliente = this.cliente1.id;
        this.toastr.success('Cliente encontrado');
        this.dato = '';
        this.datoscliente = true;
        this.buscar = false;
      },
      err => {
        this.toastr.error('no se pudo encotrar cliente');
      }
    );
  }
  searchDocCliente() {
    this.clienteService.getClientedoc(this.dato).subscribe(
      res => {
        this.cliente1 = res;
        this.codigocliente = this.cliente1.id;
        this.toastr.success('Cliente encontrado');
        this.dato = '';
        this.datoscliente = true;
        this.buscar = false;
      },
      err => {
        this.toastr.error('no se pudo encotrar cliente');
      }
    );
  }
  ngOnInit(): void {
    this.getcantidad();
    const lafechita: any = this.activatedRoute.snapshot.paramMap.get('fecha');
    const fecha = lafechita.toString();
    const fechahoy = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const fechahoystringvalue = fechahoy.toISOString().split('T')[0];
    const lafecha = new Date(fecha);
    const fechatringvalue = lafecha.toISOString().split('T')[0];
    console.log(fechahoystringvalue, fechatringvalue);
    if (fechatringvalue === fechahoystringvalue) {
      console.log('la fecha es de hoy');
      this.reserva.Condition = 'atencion';
    } else {
      this.reserva.Condition = 'reservado';
    }
    const elusuario: any = localStorage.getItem('admin');
    this.usuario = JSON.parse(elusuario);
    const elcodigohorario: any = this.activatedRoute.snapshot.paramMap.get('horario');
    const codigohorario = parseInt(elcodigohorario);
    this.reserva.HorarioId = codigohorario;

    this.horarioService.getHorario(codigohorario.toString()).subscribe(
      reshorario => {
        this.horario = reshorario;
        this.detailhorario = reshorario;
        // this.total = this.detailhorario.especialista.especialidad.Price;
        const parametrito = this.detailhorario.especialista.especialidad.id;
        if (parametrito === 2) {
          this.reserva.Type = 'medicina del dolor';
        } else {
          this.reserva.Type = 'normal';
        }
      }, err => {
        this.toastr.error('Error Api get horario');
      }
    );
  }
  onOptionsSelectedStatusReserva(event: any) {
    const value = event.target.value;
    this.reserva.Condition = value;
  }
  reservar() {
    console.log(this.cantidadanalisis + 1);
    console.log(this.cantidadrxtmrm + 1);
    this.reserva.ClienteId = this.codigocliente;
    this.reserva.Labpay = '0';
    this.reserva.Labstatus = 'asignado';
    this.reserva.Labpaymentstatus = 'sin monto';
    this.reserva.Labamount = '0';
    let banderita = false;
    let banderita2 = false;
    let newpago;
    let newtotal;
    const pagoquito: any = this.reserva.Amount;
    const total1: any = this.reserva.Pay;
    if (pagoquito.includes('.')) {
      banderita = true;
      newpago = pagoquito.split('.')[0];
      this.reserva.Amount = newpago;
    }
    if (total1.includes('.')) {
      banderita = true;
      newtotal = total1.split('.')[0];
      this.reserva.Pay = newtotal;
    }
    const pagoquito1: any = this.reserva.Amount;
    const total11: any = this.reserva.Pay;
    const pago = +pagoquito1;
    const total = +total11;
    if (pago < total) {
      this.reserva.Paymentstatus = 'por pagar';
    } else {
      this.reserva.Paymentstatus = 'pagado';
    }
    if ('0' === this.reserva.Amount && this.reserva.Pay) {
      this.reserva.Paymentstatus = 'gratuito';
    }
    const lafechita: any = this.activatedRoute.snapshot.paramMap.get('fecha');
    const fecha = lafechita.toString();
    this.reserva.Appointment =  new Date(fecha);
    this.reserva.Labreceptiondate = new Date(fecha);
    this.reserva.Labresultdate = new Date(fecha);
    this.reserva.AdminId = this.usuario.id;
    delete this.reserva.id;
    console.log(this.reserva);
    this.reservaService.saveCita(this.reserva).subscribe(
      res => {
        this.reserva1 = res;
        const codigoreserva = this.reserva1.id;
        const bandera = this.reserva1.Condition;
        const parametrito = this.reserva1.Type;
        // creando los laboratorios
        // let analisis: Analisis = {
        //   Value: false,
        //   Condition: 'asignado',
        //   CitaId: codigoreserva,
        //   LaboratorioId: 0
        // };
        // let rxtmrm: ListLaboratoriocita = {
        //   Value: false,
        //   Location: '',
        //   Amount: '',
        //   Condition: 'asignado',
        //   CitaId: codigoreserva,
        //   LaboratoriodosId: 0
        // };
        // const arraylabsave: any = [];
        // const arraylab2save: any = [];
        // const limite1 = this.cantidadanalisis + 1;
        // const limite2 = this.cantidadrxtmrm + 1;
        // for (let i = 1; i < limite1; i++) {
        //   analisis.LaboratorioId = i;
        //   this.analisisService.saveAnalisis(analisis).subscribe(
        //     resdata => {
        //       arraylabsave.push(resdata);
        //       this.laboratorioscita = arraylabsave;
        //     }, err => {
        //       this.toastr.error('Error unir analisis con cita');
        //     }
        //   );
        // }
        // for (let j = 1; j < limite2; j++) {
        //   rxtmrm.LaboratoriodosId = j;
        //   this.laboratoriodoscitaService.saveLaboratoriocita(rxtmrm).subscribe(
        //     resdata1 => {
        //       arraylab2save.push(resdata1);
        //       this.laboratoriosdoscita = arraylab2save;
        //     }, err => {
        //       this.toastr.error('Error unir rxtmrm con cita');
        //     }
        //   );
        // }
        if (parametrito === 'medicina del dolor') {
          this.detallecita.CitaId = codigoreserva;
          this.detallecita.Datescale = new Date(fecha);
          this.frontbody.CitaId = codigoreserva;
          this.endbody.CitaId = codigoreserva;
          this.detallecita.Datescale =  new Date(fecha);
          this.detallecita.Startdate =  new Date(fecha);
          this.detallecita.Datethatbecameimportant =  new Date(fecha);
          this.detallecitaService.saveDetalleCita(this.detallecita).subscribe(
            resdetallecita => {
              this.resultado = resdetallecita;
              console.log(this.resultado);
              const codigodetalle = this.resultado.id;
              this.entrevista.DetallecitaId = codigodetalle;
              this.toastr.info('Creando detalle cita');
              this.examencitaService.saveExamenCita(this.entrevista).subscribe(
                resexacita => {
                  this.resultado4 = resexacita;
                  this.toastr.info('Creando examen cita');
                }, err => {
                  this.toastr.error('Error api save examen cita');
                }
              );
            }, err => {
              this.toastr.error('Error Api CREATE detalle cita');
            }
          );
          this.dermatomafrontalService.saveDermatomafrontal(this.frontbody).subscribe(
            resfrontal => {
              this.resultado2 = resfrontal;
              console.log(this.resultado2);
            }, err => {
              this.toastr.error('Error Api CREATE dermatoma frontal');
            }
          );
          this.dermatomaposteriorService.saveDermatomaposterior(this.endbody).subscribe(
            resposterior => {
              this.resultado3 = resposterior;
              console.log(this.resultado3);
            }, err => {
              this.toastr.error('Error Api CREATE dermatoma posterior');
            }
          );
        }
        if (parametrito === 'procedimiento') {
          this.detallecita.CitaId = codigoreserva;
          this.detallecita.Datescale = new Date(fecha);
          this.frontbody.CitaId = codigoreserva;
          this.endbody.CitaId = codigoreserva;
          this.detallecita.Datescale =  new Date(fecha);
          this.detallecita.Startdate =  new Date(fecha);
          this.detallecita.Datethatbecameimportant =  new Date(fecha);
          this.detallecitaService.saveDetalleCita(this.detallecita).subscribe(
            resdetallecita => {
              this.resultado = resdetallecita;
              console.log(this.resultado);
              const codigodetalle = this.resultado.id;
              this.entrevista.DetallecitaId = codigodetalle;
              this.toastr.info('Creando detalle cita');
              this.examencitaService.saveExamenCita(this.entrevista).subscribe(
                resexacita => {
                  this.resultado4 = resexacita;
                  this.toastr.info('Creando examen cita');
                }, err => {
                  this.toastr.error('Error api save examen cita');
                }
              );
            }, err => {
              this.toastr.error('Error Api CREATE detalle cita');
            }
          );
        }
        if (bandera === 'reservado') {
          this.router.navigate(
            [
              'admin',
              'procesos',
              'proceso7',
              'subproceso4',
              codigoreserva
            ]
          );
          this.toastr.success('Procedamos con la boleta');
        } else if (bandera === 'atencion') {
          this.router.navigate(
            [
              'admin',
              'procesos',
              'proceso7',
              'subproceso3',
              codigoreserva
            ]
          );
          this.toastr.success('Procedamos con la toma de las funsiones vitales');
        }
      }, err => {
        this.toastr.error('Error crear cita');
      }
    );
  }
}

