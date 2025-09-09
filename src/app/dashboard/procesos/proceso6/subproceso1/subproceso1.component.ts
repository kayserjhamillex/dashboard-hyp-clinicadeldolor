import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Chat } from '../../../../models/chat';
import { Chatmodel } from '../../../../models/chatmodel';
import { ListCita } from '../../../../models/listcita';
import { Mensaje } from '../../../../models/mensaje';
import { Mensajemodel } from '../../../../models/mensajemodel';
import { ChatService } from '../../../../services/chat.service';
import { CitaService } from '../../../../services/cita.service';
import { MensajeService } from '../../../../services/mensaje.service';

@Component({
  selector: 'app-subproceso1',
  standalone: true,
  imports: [],
  templateUrl: './subproceso1.component.html',
  styleUrl: './subproceso1.component.css'
})
export default class Subproceso1Component implements OnInit {
  bandera = true;
  lasreservas: any = [];
  filtrados: any = [];
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
  mss: any;
  mss2: any;
  chat: Chat = {
    id: 0,
    CreationDate: new Date(),
    Condition: '',
    AdminId: 0,
    ClienteId: 0
  };
  chat1: Chat = {
    id: 0,
    CreationDate: new Date(),
    Condition: '',
    AdminId: 0,
    ClienteId: 0
  };
  chatmodel: Chatmodel = {
    id: 0,
    CreationDate: new Date(),
    Condition: '',
    AdminId: 0,
    ClienteId: 0,
    admin: {
      id: 0,
      Name: '',
      LastName: '',
      Photo: '',
    },
    cliente: {
      id: 0,
      Name: '',
      LastName: '',
      Photo: ''
    }
  };
  chatmodel1: any = this.chatmodel;
  mensaje: Mensaje = {
    id: 0,
    SendDate: new Date(),
    Message: '',
    Direction: '',
    ChatId: 0
  };
  mensaje1: Mensaje = {
    id: 0,
    SendDate: new Date(),
    Message: '',
    Direction: '',
    ChatId: 0
  };
  mensajemodel: Mensajemodel = {
    id: 0,
    SendDate: new Date(),
    Message: '',
    Direction: '',
    ChatId: 0,
    chat: {
      id: 0,
      CreationDate: new Date(),
      Condition: '',
      AdminId: 0,
      ClienteId: 0,
      cliente: {
        id: 0,
        Name: '',
        LastName: '',
        Photo: ''
      }
    }
  };
  mensajemodel1: any = this.mensajemodel;
  mensajes: any = [];
  codigocliente: any;
  codigoadmin: any;
  codigochat: any;
  constructor(
    private toastr: ToastrService,
    private chatService: ChatService,
    private reservaService: CitaService,
    private mensajeService: MensajeService,
  ) { }
  wasa() {
    console.log(this.mensaje.Message);
    if (this.mensaje.Message !== '') {
      this.mensaje.Message = '';
    }
  }
  // tslint:disable-next-line: typedef
  anwerchat(wasa: any) {
    const codigo = this.codigochat;
    this.mensaje.ChatId = codigo;
    this.mensaje.Message = wasa;
    this.mensaje.Direction = 'derecha';
    this.mensaje.SendDate = new Date();
    console.log(this.mensaje);
    this.mensajeService.saveMensaje(this.mensaje).subscribe(
      res => {
        if (res) {
          this.mensaje1 = res;
          const elcodigo: any = this.mensaje1.ChatId;
          this.chat.Condition = 'enviado';
          this.chatService.updateChat(elcodigo, this.chat).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            res => {
              if (res) {
                this.chat1 = res;
                this.toastr.info('se respondio el mensaje');
                this.limpiar();
              } else {
                this.toastr.error('no es pudo responder');
              }
            }
          );
        }
      }
    );
  }
  // tslint:disable-next-line: typedef
  limpiar() {
    this.mensaje.Message = '';
    console.log(this.mensaje);
    this.toastr.info('se limpio la caja de texto');
  }
  getreservas() {
    const hoynumber = new Date().getTime();
    let a = 0;
    const limite = 10 * 60;
    this.reservaService.gettopayCita().subscribe(
      res => {
        console.log(res);
        if (Object.entries(res).length !== 0) {
          this.lasreservas = res;
          this.filtrados = res;
          let diferencia = 0;
          for (const obj of this.lasreservas) {
            const parametro = new Date(obj.createdAt).getTime();
            const resta = hoynumber - parametro;
            const division = resta / 6000;
            diferencia = limite - division;
            console.log(parametro);
            if (diferencia > 0) {
              this.filtrados[a].createdAt = diferencia;
            } else {
              this.filtrados[a].createdAt = 'ya vencio';
            }
            a++;
          }
          console.log(this.lasreservas);
          console.log(this.filtrados);
          console.log(hoynumber);

        } else {
          this.toastr.warning('No hay reservas por pagar');
          this.bandera = false;
        }
      },
      err => {
        this.toastr.error('Error en el Api');
      }
    );
  }
  borrar(par: any) {
    this.reservaService.deleteCita(par).subscribe(
      res => {
        if (res !== null) {
          this.mss2 = res;
        }
      },
      err => {
        this.toastr.error('Error en el api');
      }
    );
  }

  pagado(par: any) {
    this.reservaService.getCita(par).subscribe(
      res => {
        if (res !== null) {
          this.reserva = res;
          this.reserva.Condition = 'reservado';
          const codigo: any = this.chat.id;
          this.reservaService.updateCita(codigo.toString(), this.reserva).subscribe(
            resup => {
              if (resup !== null) {
                this.mss = resup;
              }
            },
            err => {
              this.toastr.error('Error en el Api');
            }
          );
        }
      },
      err => {
        this.toastr.error('Error de Api');
      }
    );
  }
  seleccionar(par: any) {
    console.log(par);
    this.chatService.getClientChat(par).subscribe(
      res => {
        if (res) {
          this.chat = res;
          this.chatmodel = res;
          const codigaso: any = this.chat.id;
          this.mensajeService.getMSSAnswers(codigaso.toString()).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            res => {
              if (res) {
                this.mensajes = res;
                this.toastr.info('mensajes con el cliente');
              } else {
                this.toastr.error('no se pueden listar los mensajes');
              }
            }
          );
        }
      }
    );
  }

  ngOnInit(): void {
    this.getreservas();
  }

}


