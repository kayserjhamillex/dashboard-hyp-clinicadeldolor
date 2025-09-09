import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export default class ContactoComponent implements OnInit {
  contactos: any = [];
  resultado: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private contactoService: ContactoService
  ) { }

  ngOnInit(): void {
    this.getAdmins();
  }
  // tslint:disable-next-line: typedef
  getAdmins() {
    this.contactoService.getContactos().subscribe(
      res => {
        this.contactos = res;
      },
      err => {
        this.toastr.error('Error en la Api');
      }
    );
  }
  // tslint:disable-next-line: typedef
  eliminar(codigo: any) {
    console.log(codigo);
    const codigoaeliminar = codigo;
    this.contactoService.deleteContacto(codigoaeliminar).subscribe(
      res => {
        if (res) {
          this.resultado = res;
          this.router.navigate(
            [
              'admin',
              'contacto'
            ]
          );
          this.toastr.success('contacto eliminado');
        } else {
          this.toastr.error('no se pudo eliminar');
        }
      }
    )
  }

}

