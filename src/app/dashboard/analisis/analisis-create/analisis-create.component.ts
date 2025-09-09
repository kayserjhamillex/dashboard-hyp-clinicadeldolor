import { ToastrService } from 'ngx-toastr';
import { Tipo } from '../../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Laboratorio } from '../../../models/laboratorio';
import { TipoService } from '../../../services/tipo.service';
import { ListLaboratorio } from '../../../models/listlaboratorio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaboratorioService } from '../../../services/laboratorio.service';

@Component({
  selector: 'app-analisis-create',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './analisis-create.component.html',
  styleUrl: './analisis-create.component.css'
})
export default class AnalisisCreateComponent implements OnInit {
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
  bandera: any;
  tipos: any = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tipoService: TipoService,
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
        this.toastr.error('Error Api get tipo analisis');
      }
    );
  }
  crear() {
    this.bandera = 'crear';
  }
  saveTipo() {
    delete this.tipo.id;
    this.tipoService.saveTipo(this.tipo).subscribe(
      res => {
        this.tipo1 = res;
        this.bandera = 'elegido';
        this.laboratorio.TipoId = this.tipo1.id;
      }, err => {
        this.toastr.error('Error Api save tipo analisis');
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
        this.toastr.success('Nuevo analisis creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo analisis');
      }
    );
  }
  ngOnInit(): void {
    this.bandera = 'elegir';
    this.gettipos();
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

