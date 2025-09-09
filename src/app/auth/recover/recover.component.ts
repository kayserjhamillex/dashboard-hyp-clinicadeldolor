import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../models/admin';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-recover',
    imports: [
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    templateUrl: './recover.component.html',
    styleUrl: './recover.component.css'
})
export default class RecoverComponent implements OnInit {
  correo = '';
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
  respuestita: any = [];
  codigo: any = 0;
  respuesta: any = [];
  caracteres = 'Aa0BbCc1DdEe2FfGgHh3IiJj4KkLl5MmNn6OoPp7QqRr8SsTt9UuVv*WwXxYyZz$';
  laclave: any;
  long = 10;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService
  ) { }
  // tslint:disable-next-line: typedef
  getNumero(min: any, max: any) {
    return Math.floor( Math.random() * ( max - min ) ) + min;
  }
  // tslint:disable-next-line: typedef
  generaryenviar(par: any) {
    let numero;
    let clave = '';
    /*creacion de clave*/
    for ( let i = 0; i < this.long; i++)
    {
      numero = this.getNumero( 0, this.caracteres.length );
      clave += this.caracteres.substring( numero, numero + 1 );
      this.laclave = clave;
    }
    console.log(clave);
    this.admin.Code = this.laclave;
    this.admin.ConditionMin = 'activo';
    this.adminService.updateAdmin(par, this.admin).subscribe(
      res => {
        if (res) {
          this.respuestita = res;
          this.toastr.info('se genero el codigo');
        }
      }, err => {
        this.toastr.error('Error al generar el codigo');
      }
    );
  }
  // tslint:disable-next-line: typedef
  confirmar() {
    console.log(this.correo);
    this.adminService.getSearch(this.correo).subscribe(
      res => {
        if (res) {
          this.admin = res;
          this.codigo = this.admin.id;
          // setTimeout(this.generaryenviar, 2000);
          const codigo = this.codigo.toString();
          this.generaryenviar(codigo);
          this.adminService.getrecover(codigo).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            res => {
              this.respuesta = res;
              this.toastr.success('Por favor Confirme la actualizacion en su correo');
              this.router.navigate(
                [
                  'auth',
                  'password',
                  codigo
                ]
              );
            },
            err => {
              this.toastr.error('No se pudo enviar el Correo');
            }
          );
        } else {
          this.toastr.error('Correo no es de la empresa');
        }
      },
      err => {
        this.toastr.error('Usted no es un trabajador de la empresa');
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

}

