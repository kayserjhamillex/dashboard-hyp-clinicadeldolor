import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../services/cita.service';
import { ClienteService } from '../../../services/cliente.service';
import { AnalisisService } from '../../../services/analisis.service';
import { ComentarioService } from '../../../services/comentario.service';
import { ExamencitaService } from '../../../services/examencita.service';
import { TestimonioService } from '../../../services/testimonio.service';
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
  selector: 'app-cliente-list',
  standalone: true,
  imports: [],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export default class ClienteListComponent implements OnInit {
  clientes: any = [];
  clienteshabilitados: any = [];
  clientesdesabilitados: any = [];
  comentarios: any = [];
  testimonios: any = [];
  citas: any = [];
  lista = true;
  reporte = false;
  busqueda = false;
  resultado = false;
  cliente: Cliente = {
    id: 0,
    Name: '',
    LastName: '',
    BirthDate: new Date(),
    Job: '',
    Direction: '',
    Phone: '',
    Gender: '',
    CivilStatus: '',
    DocumentNumber: '',
    Email: '',
    Password: '',
    Photo: '',
    Google: '0',
    Condition: '',
    Code: ''
  };
  dato: any;
  codigocliente: any;
  parametrito: any;
  mensaje: any;
  mensaje1: any;
  mensaje2: any;
  mensaje3: any;
  mensaje4: any;
  dataapellido: any;
  datanombre: any;
  codigoelegido: any;
  listafiltrada = true;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private reservaService: CitaService,
    private clienteService: ClienteService,
    private analisisService: AnalisisService,
    private examencitaService: ExamencitaService,
    private testimonioService: TestimonioService,
    private comentarioService: ComentarioService,
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
    this.getClientes();
  }
  informe() {
    this.lista = false;
    this.reporte = true;
    this.busqueda = false;
    this.resultado = false;
  }
  // tslint:disable-next-line: typedef
  ver() {
    this.lista = true;
    this.reporte = false;
    this.busqueda = false;
    this.resultado = false;
  }
  // tslint:disable-next-line: typedef
  buscar() {
    this.lista = false;
    this.reporte = false;
    this.busqueda = true;
    this.resultado = false;
  }
  verdesabilitados() {
    !this.listafiltrada;
    console.log(this.listafiltrada);
  }
  // tslint:disable-next-line: typedef
  searchEmailCliente() {
    this.clienteService.getClientecorreo(this.dato).subscribe(
      res => {
        this.cliente = res;
        this.codigocliente = this.cliente.id;
        this.toastr.success('Cliente encontrado');
        this.dato = '';
        this.lista = false;
        this.reporte = false;
        this.resultado = true;
        this.busqueda = false;
      },
      err => {
        this.toastr.error('no se pudo encotrar cliente');
      }
    );
  }
  // tslint:disable-next-line: typedef
  searchDocCliente() {
    this.clienteService.getClientedoc(this.dato).subscribe(
      res => {
        this.cliente = res;
        this.codigocliente = this.cliente.id;
        this.toastr.success('Cliente encontrado');
        this.dato = '';
        this.lista = false;
        this.reporte = false;
        this.resultado = true;
        this.busqueda = false;
      },
      err => {
        this.toastr.error('no se pudo encotrar cliente');
      }
    );
  }

  searchdata(apellido: any, nombre: any) {
    this.clienteService.getClientebydatos(apellido, nombre).subscribe(
      res => {
        this.clientes = res;
        this.toastr.success('Coninciencias encontradas');
      }, err => {
        this.toastr.error('no se pudo conseguir cliente');
      }
    );
  }

  deshabilitar(par: any) {
    const parametro = par;
    this.clienteService.getCliente(parametro).subscribe(
      resget => {
        this.cliente = resget;
        this.cliente.Condition = 'desabilitado';
        this.clienteService.updateCliente(parametro, this.cliente).subscribe(
          resupdate => {
            this.mensaje = resupdate;
            this.toastr.info('Paciente Deshabilitado');
            window.location.reload();
          }, err => {
            this.toastr.error('Error Update Cliente');
          }
        );
      }, err => {
        this.toastr.error('Error Get Cliente');
      }
    );
  }

  habilitar(par: any) {
    const parametro = par;
    this.clienteService.getCliente(parametro).subscribe(
      resget => {
        this.cliente = resget;
        this.cliente.Condition = 'desactivado';
        this.clienteService.updateCliente(parametro, this.cliente).subscribe(
          resupdate => {
            this.mensaje = resupdate;
            this.toastr.info('Paciente Habilitado');
            window.location.reload();
          }, err => {
            this.toastr.error('Error Update Cliente');
          }
        );
      }, err => {
        this.toastr.error('Error Get Cliente');
      }
    );
  }

  // para listar a los clientes
  // tslint:disable-next-line: typedef
  getClientes() {
    this.clienteService.getClientes().subscribe(
      res => {
        this.clientes = res;
        const array1 = this.clientes;
        const array2: any = [];
        const array3: any = [];
        for (const item of array1) {
          if (item.Condition !== 'desabilitado') {
            array2.push(item);
            this.clienteshabilitados = array2;
          } else {
            array3.push(item);
            this.clientesdesabilitados = array3;
          }
        }
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'cliente',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Cliente');
    this.router.navigate(
      [
        'admin',
        'cliente',
        'update',
        codigoaeditar
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editarsearch() {
    const parametro = this.codigocliente;
    this.toastr.info('Editar Cliente');
    this.router.navigate(
      [
        'admin',
        'cliente',
        'update',
        parametro
      ]
    );
  }
}

