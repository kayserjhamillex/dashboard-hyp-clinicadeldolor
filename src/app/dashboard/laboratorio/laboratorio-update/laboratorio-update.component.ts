import { ToastrService } from 'ngx-toastr';
import { Tipo } from '../../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Laboratoriodos } from '../../../models/laboratoriodos';
import { TipodosService } from '../../../services/tipodos.service';
import { ListLaboratoriodos } from '../../../models/listlaboratoriodos';
import { LaboratoriodosService } from '../../../services/laboratoriodos.service';

@Component({
  selector: 'app-laboratorio-update',
  standalone: true,
  imports: [],
  templateUrl: './laboratorio-update.component.html',
  styleUrl: './laboratorio-update.component.css'
})
export default class LaboratorioUpdateComponent implements OnInit {
  tipo: Tipo = {
    id: 0,
    Name: ''
  };
  tipo1: Tipo = {
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
  laboratoriodetail: Laboratoriodos = {
    id: 0,
    Name: '',
    Detail: '',
    Plurality: '',
    Price: 0,
    TipodosId: 0,
    tipodos: {
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
    private tipoService: TipodosService,
    private activatedRoute: ActivatedRoute,
    private laboratorioService: LaboratoriodosService,
  ) { }
  gettipos() {
    this.tipoService.getTipodoss().subscribe(
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
    this.laboratorio.TipodosId = value;
    console.log(value);
    this.tipoService.getTipodos(value).subscribe(
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
    this.tipoService.saveTipodos(this.tipo).subscribe(
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
        this.toastr.success('Nuevo laboratorio creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo laboratorio');
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
        'rx-tm-rm',
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
        this.toastr.success('Laboratorio actualizado');
        this.finish();
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo actualizar laboratorio');
      }
    );
  }

}

