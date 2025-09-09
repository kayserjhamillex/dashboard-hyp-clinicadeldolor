import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { EpisodioService } from '../../../services/episodio.service';

@Component({
  selector: 'app-episodio-list',
  standalone: true,
  imports: [],
  templateUrl: './episodio-list.component.html',
  styleUrl: './episodio-list.component.css'
})
export default class EpisodioListComponent implements OnInit {
  episodios: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private episodioService: EpisodioService
  ) { }

  ngOnInit(): void {
    this.getepisodios();
  }

  // tslint:disable-next-line: typedef
  getepisodios() {
    this.episodioService.getEpisodios().subscribe(
      res => {
        this.episodios = res;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'episodio',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar episodio');
    this.router.navigate(
      [
        'admin',
        'episodio',
        'update',
        codigoaeditar
      ]
    );
  }

}

