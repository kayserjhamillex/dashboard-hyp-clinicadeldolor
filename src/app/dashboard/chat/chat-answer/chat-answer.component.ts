import { ToastrService } from 'ngx-toastr';
import { Chat } from '../../../models/chat';
import { Admin } from '../../../models/admin';
import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../../models/mensaje';
import { Chatmodel } from '../../../models/chatmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { Mensajemodel } from '../../../models/mensajemodel';
import { ChatService } from '../../../services/chat.service';
import { MensajeService } from '../../../services/mensaje.service';

@Component({
  selector: 'app-chat-answer',
  standalone: true,
  imports: [],
  templateUrl: './chat-answer.component.html',
  styleUrl: './chat-answer.component.css'
})
export default class ChatAnswerComponent implements OnInit {
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
    ChatId: 0,
  };
  mensaje1: Mensaje = {
    id: 0,
    SendDate: new Date(),
    Message: '',
    Direction: '',
    ChatId: 0,
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
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private mensajeService: MensajeService,
  ) { }

  // tslint:disable-next-line: typedef
  wasa() {
    console.log(this.mensaje.Message);
    if (this.mensaje.Message !== '') {
      this.mensaje.Message = '';
    }
  }
  ngOnInit(): void {
    const dato: any = localStorage.getItem('admin');
    this.admin = JSON.parse(dato);
    const params = this.activatedRoute.snapshot.params;
    const codigo = params["id"];
    this.codigochat = codigo;
    this.chatService.getChat(codigo).subscribe(
      res => {
        if (res) {
          this.chat = res;
          this.chatmodel = res;
          const codigaso: any = this.chat.id?.toString();
          this.mensajeService.getMSSAnswers(codigaso).subscribe(
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

}

