import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComentarioService } from '../../../services/comentario.service';

@Component({
  selector: 'app-comentario-list',
  standalone: true,
  imports: [],
  templateUrl: './comentario-list.component.html',
  styleUrl: './comentario-list.component.css'
})
export default class ComentarioListComponent implements OnInit {
  comentarios: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private comentarioService: ComentarioService
  ) { }

  // tslint:disable-next-line: typedef
  atras() {
    this.router.navigate(
      [
        'admin',
        'comentarios',
        'listblog'
      ]
    );
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.comentarioService.getComentariosbyBlog(params["id"]).subscribe(
      res => {
        this.comentarios = res;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar el Comentario');
    this.router.navigate(
      [
        'admin',
        'comentarios',
        'editar',
        codigoaeditar
      ]
    );
  }

}

