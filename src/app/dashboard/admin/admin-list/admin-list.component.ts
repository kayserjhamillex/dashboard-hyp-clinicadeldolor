import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../models/admin';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CitaService } from '../../../services/cita.service';
import { AdminService } from '../../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalisisService } from '../../../services/analisis.service';
import { ExamencitaService } from '../../../services/examencita.service';
import { DuracioncitaService } from '../../../services/duracioncita.service';
import { FrecuenciacitaService } from '../../../services/frecuenciacita.service';
import { DetallecitacitaService } from '../../../services/detallecitacita.service';
import { DermatomafrontalService } from '../../../services/dermatomafrontal.service';
import { AntpatologicocitaService } from '../../../services/antpatologicocita.service';
import { DermatomaposteriorService } from '../../../services/dermatomaposterior.service';
import { LaboratoriodoscitaService } from '../../../services/laboratoriodoscita.service';
import { AntnopatologicocitaService } from '../../../services/antnopatologicocita.service';
import { AntheredofamiliarcitaService } from '../../../services/antheredofamiliarcita.service';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export default class AdminListComponent implements OnInit {
  admins: any = [];
  adminshabilitados: any = [];
  adminsdeshabilitados: any = [];
  admin: Admin = {
    id: 0,
    Name: '',
    LastName: '',
    Phone: '',
    Email: '',
    Password: '',
    Condition: '',
    ConditionMin: '',
    Photo: '',
    Code: ''
  };
  listafiltrada = true;
  mensaje: any;
  cantidadcitas: any;
  codigoelegido: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService,
    private reservaService: CitaService,
    private analisisService: AnalisisService,
    private examencitaService: ExamencitaService,
    private duracioncitaService: DuracioncitaService,
    private ant3citaService: AntpatologicocitaService,
    private detallecitaService: DetallecitacitaService,
    private ant2citaService: AntnopatologicocitaService,
    private frecuenciacitaService: FrecuenciacitaService,
    private laboratorioService: LaboratoriodoscitaService,
    private ant1citaService: AntheredofamiliarcitaService,
    private dermatomafrontalService: DermatomafrontalService,
    private dermatomaposteriorService: DermatomaposteriorService,
  ) { }
  ngOnInit(): void {
    this.getAdmins();
  }
  verdesabilitados() {
    !this.listafiltrada;
    console.log(this.listafiltrada);
  }

  deshabilitar(par: any) {
    const parametro = par;
    this.adminService.getAdmin(parametro).subscribe(
      resget => {
        this.admin = resget;
        this.admin.ConditionMin = 'desabilitado';
        this.adminService.updateAdmin(parametro, this.admin).subscribe(
          resupdate => {
            this.mensaje = resupdate;
            this.toastr.info('Paciente Deshabilitado');
            window.location.reload();
          }, err => {
            this.toastr.error('Error Update admin');
          }
        );
      }, err => {
        this.toastr.error('Error Get admin');
      }
    );
  }

  habilitar(par: any) {
    const parametro = par;
    this.adminService.getAdmin(parametro).subscribe(
      resget => {
        this.admin = resget;
        this.admin.ConditionMin = 'desactivado';
        this.adminService.updateAdmin(parametro, this.admin).subscribe(
          resupdate => {
            this.mensaje = resupdate;
            this.toastr.info('Paciente Habilitado');
            window.location.reload();
          }, err => {
            this.toastr.error('Error Update admin');
          }
        );
      }, err => {
        this.toastr.error('Error Get admin');
      }
    );
  }

  // tslint:disable-next-line: typedef
  getAdmins() {
    this.adminService.getAdmins().subscribe(
      res => {
        this.admins = res;
        const array1 = this.admins;
        const array2: any = [];
        const array3: any = [];
        for (const item of array1) {
          if (item.Condition !== 'desabilitado') {
            array2.push(item);
            this.adminshabilitados = array2;
          } else {
            array3.push(item);
            this.adminsdeshabilitados = array3;
          }
        }
      },
      err => {
        this.toastr.error('Error en la Api');
      }
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'admin',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Admin');
    this.router.navigate(
      [
        'admin',
        'admin',
        'update',
        codigoaeditar
      ]
    );
  }
}

