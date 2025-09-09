import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ValorService } from '../../../services/valor.service';

@Component({
  selector: 'app-valor-list',
  standalone: true,
  imports: [],
  templateUrl: './valor-list.component.html',
  styleUrl: './valor-list.component.css'
})
export default class ValorListComponent implements OnInit {
  valores: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private valorService: ValorService
  ) { }

  ngOnInit(): void {
    this.getvalors();
  }

  // tslint:disable-next-line: typedef
  getvalors() {
    this.valorService.getValors().subscribe(
      res => {
        this.valores = res;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'valor',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar valor');
    this.router.navigate(
      [
        'admin',
        'valor',
        'update',
        codigoaeditar
      ]
    );
  }

}
