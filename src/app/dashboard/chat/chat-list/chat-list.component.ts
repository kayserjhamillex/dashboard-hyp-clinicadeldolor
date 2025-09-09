import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../models/admin';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export default class ChatListComponent implements OnInit {
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
    this.chatService.getChats().subscribe(
      res => {
        if (res) {
          this.chats = res;
          console.log(this.chats);
          this.toastr.info('lista de todos los chats');
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
    const dato: any = localStorage.getItem('admin');
    this.admin = JSON.parse(dato);
    this.getchats();
  }

}

