import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PoliticaService } from '../../../services/politica.service';

@Component({
  selector: 'app-politica-list',
  standalone: true,
  imports: [],
  templateUrl: './politica-list.component.html',
  styleUrl: './politica-list.component.css'
})
export default class PoliticaListComponent implements OnInit {
  politicas: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private politicaService: PoliticaService
  ) { }

  ngOnInit(): void {
    this.getPoliticas();
  }

  // tslint:disable-next-line: typedef
  getPoliticas() {
    this.politicaService.getPoliticas().subscribe(
      res => {
        this.politicas = res;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'politica',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Politica');
    this.router.navigate(
      [
        'admin',
        'politica',
        'update',
        codigoaeditar
      ]
    );
  }

}
