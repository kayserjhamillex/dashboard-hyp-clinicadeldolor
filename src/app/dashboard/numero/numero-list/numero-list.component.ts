import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NumeroService } from '../../../services/numero.service';

@Component({
  selector: 'app-numero-list',
  standalone: true,
  imports: [],
  templateUrl: './numero-list.component.html',
  styleUrl: './numero-list.component.css'
})
export default class NumeroListComponent implements OnInit {
  numeros: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private numeroService: NumeroService
  ) { }

  ngOnInit(): void {
    this.getNumeros();
  }

  // tslint:disable-next-line: typedef
  getNumeros() {
    this.numeroService.getNumeros().subscribe(
      res => {
        this.numeros = res;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'numero',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Numero');
    this.router.navigate(
      [
        'admin',
        'numero',
        'update',
        codigoaeditar
      ]
    );
  }

}

