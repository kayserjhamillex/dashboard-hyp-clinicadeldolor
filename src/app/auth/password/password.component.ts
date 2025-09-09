import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../models/admin';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-password',
    imports: [
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    templateUrl: './password.component.html',
    styleUrl: './password.component.css'
})
export default class PasswordComponent implements OnInit {
  parametro = {
    contra1: '',
    contra2: ''
  };
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
  admin1: Admin = {
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
  admin2: Admin = {
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
  dato = '';
  respuesta: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.adminService.getAdmin(params['id']).subscribe(
        res => {
          console.log(res);
          this.admin = res;
        },
        err => console.log(err)
      );
    }
  }
  // tslint:disable-next-line: typedef
  comprobarcodigo(par: any) {
    const codigo: any = this.admin.id;
    this.adminService.getcofirecover(par.tostring(), codigo).subscribe(
      res => {
        if (res !== null) {
          this.admin1 = res;
          this.toastr.info('Proceda a cambiar su contra');
        } else {
          this.toastr.error('Codigo no encontrado');
        }
      },
      err => {
        this.toastr.error('Codigo desactivado');
      }
    );
  }
  // tslint:disable-next-line: typedef
  actualizar() {
    const params = this.activatedRoute.snapshot.params;
    const codigo = params['id'];
    this.admin1.Password = this.parametro.contra1;
    if (this.parametro.contra1 !== '' && this.parametro.contra2 !== '') {
      if (this.parametro.contra1 === this.parametro.contra2) {
        console.log(this.admin1);
        this.adminService.updateAdmin(codigo, this.admin1).subscribe(
          res => {
            this.respuesta = res;
            this.toastr.success('Contraseña actualizada');
            this.router.navigate(
              [
                'auth',
                'login'
              ]
            );
          },
          err => {
            this.toastr.error('no se pudo actualizar');
          }
        );
      } else {
        this.toastr.error('la repeticion de la contraseña es diferente');
      }
    } else {
      this.toastr.error('Por favor rellenar los campos iguales');
    }
  }

}

