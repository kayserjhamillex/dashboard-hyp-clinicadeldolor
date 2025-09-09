import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-servicio-list',
  standalone: true,
  imports: [],
  templateUrl: './servicio-list.component.html',
  styleUrl: './servicio-list.component.css'
})
export default class ServicioListComponent implements OnInit {
  servicios: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private servicioService: ServicioService
  ) { }

  ngOnInit(): void {
    this.getservicios();
  }
  getservicios() {
    this.servicioService.getServicios().subscribe(
      res => {
        this.servicios = res;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'servicio',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar servicio');
    this.router.navigate(
      [
        'admin',
        'servicio',
        'update',
        codigoaeditar
      ]
    );
  }
}

