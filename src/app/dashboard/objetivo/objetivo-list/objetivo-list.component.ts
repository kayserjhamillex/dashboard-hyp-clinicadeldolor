import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ObjetivoService } from '../../../services/objetivo.service';

@Component({
  selector: 'app-objetivo-list',
  standalone: true,
  imports: [],
  templateUrl: './objetivo-list.component.html',
  styleUrl: './objetivo-list.component.css'
})
export default class ObjetivoListComponent implements OnInit {
  objetivos: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private objetivoService: ObjetivoService
  ) { }

  ngOnInit(): void {
    this.getObjetivos();
  }

  // tslint:disable-next-line: typedef
  getObjetivos() {
    this.objetivoService.getObjetivos().subscribe(
      res => {
        this.objetivos = res;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'objetivo',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Objetivo');
    this.router.navigate(
      [
        'admin',
        'objetivo',
        'update',
        codigoaeditar
      ]
    );
  }

}

