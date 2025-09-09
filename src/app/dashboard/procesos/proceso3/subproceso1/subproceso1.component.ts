import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../../models/cliente';
import { Genero } from '../../../../models/genero.model';
import { ListCita } from '../../../../models/listcita';
import { CitaService } from '../../../../services/cita.service';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-subproceso1',
  standalone: true,
  imports: [],
  templateUrl: './subproceso1.component.html',
  styleUrl: './subproceso1.component.css'
})
export default class Subproceso1Component implements OnInit {
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
    Google: '0',
    Condition: '',
    Code: ''
  };
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
  reservas: any = [];
  itemslab: any = [];
  itemscita: any = [];
  hombre = 'https://fieldsports.herokuapp.com/stylesheets/usuarios/man.png';
  mujer = 'https://fieldsports.herokuapp.com/stylesheets/usuarios/women.png';
  botones = true;
  buscar = false;
  crear = false;
  datoscliente = false;
  codigocliente: any;
  deuda = false;
  codigoreserva: any;
  mensaje: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private reservaService: CitaService,
    private clienteService: ClienteService,
  ) { }
  // tslint:disable-next-line: typedef
  onOptionsSelected(event: any) {
    const value = event.target.value;
    this.cliente.Gender = value;
    console.log(value);
  }
  // tslint:disable-next-line: typedef
  onOptionsSelectedStatus(event: any) {
    const value = event.target.value;
    this.cliente.CivilStatus = value;
    console.log(value);
  }
  activarbotones() {
    this.botones = true;
    this.buscar = false;
    this.crear = false;
    this.datoscliente = false;
  }
  // tslint:disable-next-line: typedef
  buscarcliente() {
    this.buscar = true;
    this.botones = false;
  }
  // tslint:disable-next-line: typedef
  crearcliente() {
    // this.crear = true;
    // this.botones = false;
    this.toastr.warning('Procedimiento en analisis');
  }
  // tslint:disable-next-line: typedef
  cambiarimagen(valor: any) {
    if (valor === 'Masculino') {
    this.cliente.Photo = this.hombre;
    } else if (valor === 'Femenino') {
      this.cliente.Photo = this.mujer;
    }
  }
  // tslint:disable-next-line: typedef
  saveCliente() {
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
  // tslint:disable-next-line: typedef
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
  // tslint:disable-next-line: typedef
  searchDocCliente() {
    this.clienteService.getClientedoc(this.dato).subscribe(
      res => {
        this.cliente1 = res;
        this.codigocliente = this.cliente1.id;
        this.toastr.success('Cliente encontrado');
        this.dato = '';
        this.datoscliente = true;
        this.buscar = false;
        this.reservaService.getCitaLabpay(this.codigocliente).subscribe(
          reslabcita => {
            console.log(reslabcita);
            if (Object.entries(reslabcita).length > 0) {
              this.reservas = reslabcita;
              this.deuda = true;
              this.toastr.info('Paciente tiene deudas de laboratorio');
            } else {
              this.deuda = false;
              this.toastr.info('El paciente no tiene deudas de laboratorio');
            }
          },
          err => {
            this.toastr.error('Error del api get lab cita status paga');
          }
        );
      },
      err => {
        this.toastr.error('no se pudo encotrar cliente');
      }
    );
  }
  ngOnInit(): void {

  }
  visualizar(codigo: any) {
    this.reservaService.getCita(codigo).subscribe(
      rescita => {
        if (rescita !== null) {
          this.reserva = rescita;
          this.codigoreserva = this.reserva.id;
          this.toastr.success('Procedamos a pagar');
        } else {
          this.toastr.error('datos no obtenidos de la reserva');
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
      this.reserva.Labpaymentstatus = 'por pagar';
    } else {
      this.reserva.Labpaymentstatus = 'pagado';
    }
    if ('0' === this.reserva.Labamount && this.reserva.Labpay) {
      this.reserva.Labpaymentstatus = 'gratuito';
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
}

