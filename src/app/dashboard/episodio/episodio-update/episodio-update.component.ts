import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Episodio } from '../../../models/episodio';
import { Router, ActivatedRoute } from '@angular/router';
import { EpisodioService } from '../../../services/episodio.service';

@Component({
  selector: 'app-episodio-update',
  standalone: true,
  imports: [],
  templateUrl: './episodio-update.component.html',
  styleUrl: './episodio-update.component.css'
})
export default class EpisodioUpdateComponent implements OnInit {
  episodio: Episodio = {
    id: 0,
    Name: '',
    Detail: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private episodioService: EpisodioService,
  ) { }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.episodioService.getEpisodio(params["id"]).subscribe(
        res => {
          console.log(res);
          this.episodio = res;
        },
        err => {
          this.toastr.error('Datos no obtenidos');
        }
      );
    }
  }
  updateEpisodio() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.episodio);
    // llamando a servicio de creacion que esta enlazada con el api
    this.episodioService.updateEpisodio(params["id"], this.episodio).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'episodio',
            'list'
          ]
        );
        this.toastr.success('Nuevo episodio creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo episodio');
      }
    );
  }

}

