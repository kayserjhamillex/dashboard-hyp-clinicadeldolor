import { ToastrService } from 'ngx-toastr';
import { Tipo } from '../../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TipodosService } from '../../../services/tipodos.service';
import { ListLaboratoriodos } from '../../../models/listlaboratoriodos';
import { LaboratoriodosService } from '../../../services/laboratoriodos.service';

@Component({
  selector: 'app-laboratorio-add',
  standalone: true,
  imports: [],
  templateUrl: './laboratorio-add.component.html',
  styleUrl: './laboratorio-add.component.css'
})
export default class LaboratorioAddComponent implements OnInit {
  tipo: Tipo = {
    id: 0,
    Name: ''
  };
  laboratorio: ListLaboratoriodos = {
    id: 0,
    Name: '',
    Detail: '',
    Plurality: '',
    Price: 0,
    TipodosId: 0
  };
  laboratorio1: ListLaboratoriodos = {
    id: 0,
    Name: '',
    Detail: '',
    Plurality: '',
    Price: 0,
    TipodosId: 0
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tipoService: TipodosService,
    private activatedRoute: ActivatedRoute,
    private laboratorioService: LaboratoriodosService,
  ) { }
  saveLaboratorio() {
    delete this.laboratorio.id;
    console.log(this.laboratorio);
    this.laboratorioService.saveLaboratorio(this.laboratorio).subscribe(
      res => {
        this.laboratorio1 = res;
        console.log(res);
        this.toastr.success('Nuevo laboratorio creado');
        this.finish();
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo laboratorio');
      }
    );
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.tipoService.getTipodos(params["id"]).subscribe(
        res => {
          console.log(res);
          this.tipo = res;
          this.laboratorio.TipodosId = this.tipo.id;
        },
        err => {
          this.toastr.error('Datos no obtenidos');
        }
      );
    }
  }
  finish() {
    this.router.navigate(
      [
        'admin',
        'rx-tm-rm',
        'list'
      ]
    );
  }

}

