import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Politica } from '../../../models/politica';
import { PoliticaService } from '../../../services/politica.service';

@Component({
  selector: 'app-politica-update',
  standalone: true,
  imports: [],
  templateUrl: './politica-update.component.html',
  styleUrl: './politica-update.component.css'
})
export default class PoliticaUpdateComponent implements OnInit {
  politica: Politica = {
    id: 0,
    Name: '',
    Detail: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private politicaService: PoliticaService,
  ) { }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.politicaService.getPolitica(params["id"]).subscribe(
        res => {
          console.log(res);
          this.politica = res;
        },
        err => {
          this.toastr.error('Datos no obtenidos');
        }
      );
    }
  }
  updatePolitica() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.politica);
    // llamando a servicio de creacion que esta enlazada con el api
    this.politicaService.updatePolitica(params["id"], this.politica).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'politica',
            'list'
          ]
        );
        this.toastr.success('Nuevo politica creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo politica');
      }
    );
  }
}

