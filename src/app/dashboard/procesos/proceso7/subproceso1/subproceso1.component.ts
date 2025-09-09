import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CitaService } from '../../../../services/cita.service';
import { DoctorService } from '../../../../services/doctor.service';
import { EspecialistaService } from '../../../../services/especialista.service';
import { HorarioService } from '../../../../services/horario.service';

@Component({
  selector: 'app-subproceso1',
  standalone: true,
  imports: [],
  templateUrl: './subproceso1.component.html',
  styleUrl: './subproceso1.component.css'
})
export default class Subproceso1Component implements OnInit {
  especialistas: any = [];
  doctores: any = [];
  reservasdia: any = [];
  horario: any = [];
  filtrada: any = [];
  horariofiltrado: any = [];
  filtro1horario: any = [];
  filtro2horario: any = [];
  bandera = false;
  banderadia = false;
  banderatarde = false;
  fechamin: Date | undefined;
  fechamax: Date | undefined;
  stringmax: any;
  stringmin: any;
  fecha: Date | undefined;
  codigodoctor: any;
  fechastringvalue: any;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private reservaService: CitaService,
    private doctorService: DoctorService,
    private horarioService: HorarioService,
    private especialistaService: EspecialistaService,
  ) { }
  ver(codigo: any) {
    this.codigodoctor = codigo;
    this.especialistaService.getEspecialistaFilterDoctor(codigo).subscribe(
      res => {
        this.especialistas = res;
        this.toastr.success('Especialidades del Doctor');
      }, err => {
        this.toastr.error('Error en la Api');
      }
    );
  }
  getdoctores() {
    this.doctorService.getDoctors().subscribe(
      res => {
        this.doctores = res;
        console.log(res);
        this.toastr.success('Doctores');
      }, err => {
        this.toastr.error('Error en la Api');
      }
    );
  }
  ngOnInit(): void {
    this.getdoctores();
    this.fechamin = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this.fechamax = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    this.stringmin = this.pd.transform(this.fechamin, 'yyyy-MM-dd');
    this.stringmax = this.pd.transform(this.fechamax, 'yyyy-MM-dd');
  }
  select(codigo: any) {
    const lafecha: any = this.fecha;
    const fechita = new Date(lafecha);
    const diasemanal = fechita.getDay();
    this.fechastringvalue = fechita.toISOString().split('T')[0];
    const dias =
    [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo'
    ];
    const namedia = dias[diasemanal];
    const parametro = codigo;
    const lafechita = this.fechastringvalue;
    console.log(namedia);
    this.reservaService.getDisponibilidad(lafechita, parametro).subscribe(
      reservas1 => {
        this.reservasdia = reservas1;
        console.log(this.reservasdia);
        this.horarioService.getHorarioEspecialidaddDia(namedia, parametro).subscribe(
          disponibilidad => {
            this.horario = disponibilidad;
            if (Object.entries(this.reservasdia).length > 0) {
              const array1 = this.reservasdia;
              const array2 = this.horario;
              const filtrado: any = [];
              for (const item of array2) {
                const codigohorario = item.id;
                for (const obj of array1) {
                  const codigofiltrar = obj.HorarioId;
                  if (codigohorario === codigofiltrar) {
                    filtrado.push(item);
                    this.filtrada = filtrado;
                  }
                }
              }
              const array3 = this.filtrada;
              // eliminamos la coincidencia entre los array
              const respuesta = array2.filter((alv: any) => !array3.includes(alv));
              this.horariofiltrado = respuesta;
            } else if (Object.entries(this.reservasdia).length === 0) {
              this.horariofiltrado = this.horario;
            }
            console.log(this.horariofiltrado);
            // aca filtramos los turnos
            const arraycito = this.horariofiltrado;
            const filtro1: any = [];
            const filtro2: any = [];
            const parametro1 = 'mañana';
            const parametro2 = 'tarde';
            for (const obj of arraycito) {
              const par = obj.hora.Turn;
              if (par === parametro1) {
                filtro1.push(obj);
                this.filtro1horario = filtro1;
              } else if (par === parametro2) {
                filtro2.push(obj);
                this.filtro2horario = filtro2;
              }
            }
            if (Object.entries(this.filtro1horario).length > 0) {
              this.banderadia = true;
            }
            if (Object.entries(this.filtro2horario).length > 0) {
              this.banderatarde = true;
            }
            this.bandera = true;
            this.toastr.info('Horario del especialista Elegido');
          },
          err => {
            console.log(err);
          }
        );
      }
    );
  }
  proseguir(codigo: any) {
    const parametro = this.fechastringvalue;
    const parametro2 = codigo;
    this.router.navigate(
      [
        'admin',
        'procesos',
        'proceso7',
        'subproceso2',
        parametro2,
        parametro
      ]
    );
    this.toastr.success('Registrar al paciente y pago');
  }

}

