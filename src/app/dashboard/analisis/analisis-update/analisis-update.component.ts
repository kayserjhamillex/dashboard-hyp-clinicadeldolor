import { ToastrService } from 'ngx-toastr';
import { Tipo } from '../../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { Laboratorio } from '../../../models/laboratorio';
import { TipoService } from '../../../services/tipo.service';
import { ListLaboratorio } from '../../../models/listlaboratorio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LaboratorioService } from '../../../services/laboratorio.service';

@Component({
  selector: 'app-analisis-update',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './analisis-update.component.html',
  styleUrl: './analisis-update.component.css'
})
export default class AnalisisUpdateComponent implements OnInit {
  tipo: Tipo = {
    id: 0,
    Name: ''
  };
  tipo1: Tipo = {
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
  laboratoriodetail: Laboratorio = {
    id: 0,
    Name: '',
    Detail: '',
    Price: 0,
    TipoId: 0,
    tipo: {
      id: 0,
      Name: '',
    }
  };
  ladata: any = this.laboratoriodetail;
  bandera = 'elegido';
  tipos: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tipoService: TipoService,
    private activatedRoute: ActivatedRoute,
    private laboratorioService: LaboratorioService,
  ) { }
  gettipos() {
    this.tipoService.getTipos().subscribe(
      res => {
        this.tipos = res;
      },
      err => {
        console.error(err);
      }
    );
  }
  onOptionsSelectedTipe(event: any) {
    const value = event.target.value;
    this.laboratorio.TipoId = value;
    console.log(value);
    this.tipoService.getTipo(value).subscribe(
      res => {
        this.tipo1 = res;
        this.bandera = 'elegido';
      }, err => {
        this.toastr.error('Error Api');
      }
    );
  }
  crear() {
    this.bandera = 'crear';
  }
  elegir() {
    this.bandera = 'elegir';
  }
  saveTipo() {
    delete this.tipo.id;
    this.tipoService.saveTipo(this.tipo).subscribe(
      res => {
        this.tipo1 = res;
      }, err => {
        this.toastr.error('Error Api');
        this.bandera = 'elegido';
      }
    );
  }
  saveLaboratorio() {
    delete this.laboratorio.id;
    console.log(this.laboratorio);
    // llamando a laboratorio de creacion que esta enlazada con el api
    this.laboratorioService.saveLaboratorio(this.laboratorio).subscribe(
      res => {
        this.laboratorio1 = res;
        this.ladata = res;
        console.log(res);
        this.bandera = 'elegir';
        // this.router.navigate(
        //   [
        //     'admin',
        //     'laboratorio',
        //     'list'
        //   ]
        // );
        this.toastr.success('Nuevo analisis creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo analisis');
      }
    );
  }
  ngOnInit(): void {
    this.gettipos();
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.laboratorioService.getLaboratorio(params["id"]).subscribe(
        res => {
          console.log(res);
          this.laboratorio = res;
          this.ladata = res;
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
  updateLaboratorio() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.laboratorio);
    // llamando a laboratorio de creacion que esta enlazada con el api
    this.laboratorioService.updateLaboratorio(params["id"], this.laboratorio).subscribe(
      res => {
        console.log(res);
        this.toastr.success('analisis actualizado');
        this.finish();
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo actualizar analisis');
      }
    );
  }
}

