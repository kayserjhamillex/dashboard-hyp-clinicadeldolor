import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-auth',
    imports: [
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export default class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    if (this.adminService.isLoggedIn()) {
      this.router.navigate(
        [
          'admin',
          'home'
        ]
      );
    } else {
      this.router.navigate(
        [
          'auth',
          'login'
        ]
      );
    }
    this.adminService.client$.subscribe(res => {
      if (res) {
        this.router.navigate(
          [
            'admin',
            'home'
          ]
        );
      }
    });
  }

}
