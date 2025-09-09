import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ListHorario } from '../../../models/listhorario';
import { HoraService } from '../../../services/hora.service';
import { HorarioService } from '../../../services/horario.service';
import { EspecialistaService } from '../../../services/especialista.service';

@Component({
  selector: 'app-horario-create',
  standalone: true,
  imports: [],
  templateUrl: './horario-create.component.html',
  styleUrl: './horario-create.component.css'
})
export default class HorarioCreateComponent implements OnInit {
  dia: any = '';
  data = {
    inicio: 0,
    fin: 0,
    dia: '',
    especialista: 0
  };
  horario: ListHorario = {
    id: 0,
    Day: '',
    EspecialistaId: 0,
    HoraId: 0,
  };
  horario1: ListHorario = {
    id: 0,
    Day: '',
    EspecialistaId: 0,
    HoraId: 0,
  };
  horas: any = [];
  especialistas: any = [];
  existente: any = [];
  previo: any = [];
  codigoinicio: any;
  codigofin: any;
  numeros: any = [];
  dias = [
    {
      id: 1,
      name: 'lunes'
    },
    {
      id: 2,
      name: 'martes'
    },
    {
      id: 3,
      name: 'miercoles'
    },
    {
      id: 4,
      name: 'jueves'
    },
    {
      id: 5,
      name: 'viernes'
    },
    {
      id: 6,
      name: 'sabado'
    }
  ];
  intervalos: any = [15, 20, 30];
  turnos: any = ['', ''];
  turnoelegido: any;
  bandera = 'proceso1';
  miniproceso = 'nada';
  mostrartabla = false;
  banderaduplicidad = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private horaService: HoraService,
    private horarioService: HorarioService,
    private especialistaService: EspecialistaService,
  ) { }
  selectturno(valor: any) {
    this.turnoelegido = valor;
  }
  intervalo(valor: any) {
    const parametro = this.intervalos[valor].toString();
    const parametro2 = this.turnoelegido;
    this.horaService.getHoraFilter(parametro, parametro2).subscribe(
      res => {
        this.horas = res;
        this.bandera = 'proceso2';
        this.miniproceso = 'inicio';
        this.toastr.success('Horas en el invervalo elegido');
      },
      err => {
        console.error(err);
        this.toastr.success('Error en el invervalo elegido');
      }
    );
  }
  inicio(valor: any) {
    this.data.inicio = valor;
    this.miniproceso = 'fin';
  }
  final(valor: any) {
    this.data.fin = valor;
    this.miniproceso = 'nada';
    this.bandera = 'proceso3';
  }
  getEspecialistas() {
    this.especialistaService.getEspecialistas().subscribe(
      res => {
        this.especialistas = res;
      },
      err => {
        console.error(err);
      }
    );
  }
  rango() {
    const inicio = this.data.inicio;
    const fin = this.data.fin + 1;
    const alv: any = [];
    for (let counter = inicio; counter < fin; counter++){
      alv.push(counter);
      this.numeros = alv;
    }
    console.log(this.numeros);
  }

  elejir(codigo3: any) {
    this.bandera = 'proceso4';
    const codigo = codigo3;
    this.data.especialista = codigo;
    this.horario.EspecialistaId = codigo;
  }
  diaelegido(name: any) {
    this.rango();
    const wasa = {
      Cupo: 0,
      Day: '',
      EspecialistaId: 0,
      HoraId: 0,
    };
    this.data.dia = name;
    const diaelegido = name;
    this.horario.Day = diaelegido;
    wasa.Day = this.data.dia;
    wasa.EspecialistaId = this.data.especialista;
    console.log(this.numeros);
    const array = this.numeros;
    // comprobar si puede haber posible conflico horario
    this.horarioService.getHorarioEspecialidaddDia(this.data.dia, this.data.especialista.toString()).subscribe(
      resexistente => {
        this.existente = resexistente;
        for (const item of this.existente) {
          const parametro = item.HoraId;
          for (const obj of this.numeros) {
            if (parametro === obj) {
              this.banderaduplicidad = true;
              console.log('posible conflicto encontrado, bloqueando creacion');
            }
          }
        }
      }, err => {
        console.log(err);
      }
    );
    if (this.banderaduplicidad === false) {
      for (const obj of array) {
        // console.log(obj);
        const cupito = +array.indexOf(obj) + 1;
        wasa.Cupo = cupito;
        wasa.HoraId = obj;
        console.log(wasa);
        this.horarioService.saveHorario(wasa).subscribe(
          res => {
            console.log(res);
          },
          err => {
            this.toastr.error('Error Api crear horario');
          }
        );
      }
      this.horarioService.getHorarioEspecialidaddDia(this.data.dia, this.data.especialista.toString()).subscribe(
        respreview => {
          this.previo = respreview;
          this.bandera = 'proceso1';
          this.mostrartabla = true;
          console.log(this.previo);
          this.toastr.success('Horario creado del dia elegido');
          this.toastr.info('Procedemos a crear otro horario o finalizar');
          // this.toastr.success('Horario creado del dia elegido');
          // this.toastr.info('Procedemos a crear otro horario o finalizar');
        }, err => {
          console.log(err);
        }
      );
    } else {
      this.toastr.warning('Hay conflicto en la creacion de horario');
      console.log('hay conflico en la creacion de horario');
    }
  }
  limpiar() {
    this.previo = [];
    this.mostrartabla = false;
  }
  finish() {
    this.router.navigate(
      [
        'admin',
        'horario',
        'list'
      ]
    );
  }
  ngOnInit(): void {
    this.getEspecialistas();
  }

}

