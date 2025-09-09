import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../models/admin';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export default class ChatComponent implements OnInit {
  chats: any = [];
  codigoadmin = 2;
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
  ) { }
  // tslint:disable-next-line: typedef
  getchats() {
    this.chatService.getAnswerChats().subscribe(
      res => {
        if (res) {
          this.chats = res;
          console.log(res);
          console.log('chats por responder');
          this.toastr.info('chats por contestar');
        } else {
          console.log('no se encontro ningun chat por responder');
        }
      }
    );
  }
  // tslint:disable-next-line: typedef
  select(param: any) {
    const codigo = param;
    this.router.navigate(
      [
        'admin',
        'chat',
        'answer',
        codigo
      ]
    );
  }
  ngOnInit(): void {
    const data: any = localStorage.getItem('admin');
    this.admin = JSON.parse(data);
    this.getchats();
  }

}

