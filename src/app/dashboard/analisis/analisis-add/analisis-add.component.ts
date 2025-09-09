import { ToastrService } from 'ngx-toastr';
import { Tipo } from '../../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { TipoService } from '../../../services/tipo.service';
import { ListLaboratorio } from '../../../models/listlaboratorio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LaboratorioService } from '../../../services/laboratorio.service';

@Component({
  selector: 'app-analisis-add',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './analisis-add.component.html',
  styleUrl: './analisis-add.component.css'
})
export default class AnalisisAddComponent implements OnInit {
  tipo: Tipo = {
    id: 0,
    Name: ''
  };
  laboratorio: ListLaboratorio = {
    id: 0,
    Name: '',
    Detail: '',
    Price: 0,
    TipoId: 0
  };
  laboratorio1: ListLaboratorio = {
    id: 0,
    Name: '',
    Detail: '',
    Price: 0,
    TipoId: 0
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tipoService: TipoService,
    private activatedRoute: ActivatedRoute,
    private laboratorioService: LaboratorioService,
  ) { }
  saveLaboratorio() {
    delete this.laboratorio.id;
    console.log(this.laboratorio);
    this.laboratorioService.saveLaboratorio(this.laboratorio).subscribe(
      res => {
        this.laboratorio1 = res;
        console.log(res);
        this.toastr.success('Nuevo analisis creado');
        this.finish();
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo analisis');
      }
    );
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.tipoService.getTipo(params["id"]).subscribe(
        res => {
          console.log(res);
          this.tipo = res;
          this.laboratorio.TipoId = this.tipo.id;
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
        'analisis',
        'list'
      ]
    );
  }

}
