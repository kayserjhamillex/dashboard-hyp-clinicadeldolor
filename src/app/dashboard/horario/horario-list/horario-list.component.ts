import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Especialista } from '../../../models/especialista';
import { DoctorService } from '../../../services/doctor.service';
import { HorarioService } from '../../../services/horario.service';
import { ListEspecialista } from '../../../models/listespecialista';
import { EspecialistaService } from '../../../services/especialista.service';

@Component({
  selector: 'app-horario-list',
  standalone: true,
  imports: [],
  templateUrl: './horario-list.component.html',
  styleUrl: './horario-list.component.css'
})
export default class HorarioListComponent implements OnInit {
  doctores: any = [];
  especialistas: any = [];
  horarios: any = [];
  lunesturno1: any = [];
  lunesturno2: any = [];
  martesturno1: any = [];
  martesturno2: any = [];
  miercolesturno1: any = [];
  miercolesturno2: any = [];
  juevesturno1: any = [];
  juevesturno2: any = [];
  viernesturno1: any = [];
  viernesturno2: any = [];
  sabadoturno1: any = [];
  sabadoturno2: any = [];
  lunesbanderadia = false;
  lunesbanderatarde = false;
  martesbanderadia = false;
  martesbanderatarde = false;
  miercolesbanderadia = false;
  miercolesbanderatarde = false;
  juevesbanderadia = false;
  juevesbanderatarde = false;
  viernesbanderadia = false;
  viernesbanderatarde = false;
  sabadobanderadia = false;
  sabadobanderatarde = false;
  codigodoctor: any;
  data = {
    dia: '',
    codigo: 0
  };
  especialista: ListEspecialista = {
    id: 0,
    Turn: '',
    EspecialidadId: 0,
    DoctorId: 0,
  };
  especialistadetalle: Especialista = {
    id: 0,
    Turn: '',
    EspecialidadId: 0,
    DoctorId: 0,
    especialidad: {
      id: 0,
      Name: '',
      Image: '',
      Price: 0
    },
    doctor: {
      id: 0,
      Name: '',
      LastName: '',
      MedicalSchoolNumber: '',
      Email: '',
      Photo: ''
    }
  };
  detailespecialista: any = this.especialistadetalle;
  datos = {
    nombre: '',
    doctor: '',
    dia: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private horarioService: HorarioService,
    private especialistaService: EspecialistaService
  ) { }
  crear() {
    this.router.navigate(
      [
        'admin',
        'horario',
        'create'
      ]
    );
  }
  getdoctor() {
    this.doctorService.getDoctors().subscribe(
      res => {
        this.doctores = res;
      },
      err => console.error(err)
    );
  }
  ngOnInit(): void {
    this.getdoctor();
  }
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
  viewhorario(codigo: any) {
    const lunes = 'lunes';
    const martes = 'martes';
    const miercoles = 'miercoles';
    const jueves = 'jueves';
    const viernes = 'viernes';
    const sabado = 'sabado';
    const parametro1 = 'mañana';
    const parametro2 = 'tarde';
    this.horarioService.getHorarioEspecialidaddDia(lunes, codigo).subscribe(
      reslunes => {
        const array: any = reslunes;
        const arraydia1: any = [];
        const arraytarde1: any = [];
        for (const obj of array) {
          const par = obj.hora.Turn;
          if (par === parametro1) {
            arraydia1.push(obj);
            this.lunesturno1 = arraydia1;
          } else if (par === parametro2) {
            arraytarde1.push(obj);
            this.lunesturno2 = arraytarde1;
          }
        }
        if (Object.entries(this.lunesturno1).length > 0) {
          this.lunesbanderadia = true;
        }
        if (Object.entries(this.lunesturno2).length > 0) {
          this.lunesbanderatarde = true;
        }
        this.toastr.info('Horario del especialista Elegido');

      }, err => {
        this.toastr.error('Error en la Api get horario dia doctor');
      }
    );
    this.horarioService.getHorarioEspecialidaddDia(martes, codigo).subscribe(
      resmartes => {
        const array: any = resmartes;
        const arraydia2: any = [];
        const arraytarde2: any = [];
        for (const obj of array) {
          const par = obj.hora.Turn;
          if (par === parametro1) {
            arraydia2.push(obj);
            this.martesturno1 = arraydia2;
          } else if (par === parametro2) {
            arraytarde2.push(obj);
            this.martesturno2 = arraytarde2;
          }
        }
        if (Object.entries(this.martesturno1).length > 0) {
          this.martesbanderadia = true;
        }
        if (Object.entries(this.martesturno2).length > 0) {
          this.martesbanderatarde = true;
        }
        this.toastr.info('Horario del especialista Elegido');

      }, err => {
        this.toastr.error('Error en la Api get horario dia doctor');
      }
    );
    this.horarioService.getHorarioEspecialidaddDia(miercoles, codigo).subscribe(
      resmiercoles => {
        const array: any = resmiercoles;
        const arraydia3: any = [];
        const arraytarde3: any = [];
        for (const obj of array) {
          const par = obj.hora.Turn;
          if (par === parametro1) {
            arraydia3.push(obj);
            this.miercolesturno1 = arraydia3;
          } else if (par === parametro2) {
            arraytarde3.push(obj);
            this.miercolesturno2 = arraytarde3;
          }
        }
        if (Object.entries(this.miercolesturno1).length > 0) {
          this.miercolesbanderadia = true;
        }
        if (Object.entries(this.miercolesturno2).length > 0) {
          this.miercolesbanderatarde = true;
        }
        this.toastr.info('Horario del especialista Elegido');

      }, err => {
        this.toastr.error('Error en la Api get horario dia doctor');
      }
    );
    this.horarioService.getHorarioEspecialidaddDia(jueves, codigo).subscribe(
      resjueves => {
        const array: any = resjueves;
        const arraydia4: any = [];
        const arraytarde4: any = [];
        for (const obj of array) {
          const par = obj.hora.Turn;
          if (par === parametro1) {
            arraydia4.push(obj);
            this.juevesturno1 = arraydia4;
          } else if (par === parametro2) {
            arraytarde4.push(obj);
            this.juevesturno2 = arraytarde4;
          }
        }
        if (Object.entries(this.juevesturno1).length > 0) {
          this.juevesbanderadia = true;
        }
        if (Object.entries(this.juevesturno2).length > 0) {
          this.juevesbanderatarde = true;
        }
        this.toastr.info('Horario del especialista Elegido');

      }, err => {
        this.toastr.error('Error en la Api get horario dia doctor');
      }
    );
    this.horarioService.getHorarioEspecialidaddDia(viernes, codigo).subscribe(
      resviernes => {
        const array: any = resviernes;
        const arraydia5: any = [];
        const arraytarde5: any = [];
        for (const obj of array) {
          const par = obj.hora.Turn;
          if (par === parametro1) {
            arraydia5.push(obj);
            this.viernesturno1 = arraydia5;
          } else if (par === parametro2) {
            arraytarde5.push(obj);
            this.viernesturno2 = arraytarde5;
          }
        }
        if (Object.entries(this.viernesturno1).length > 0) {
          this.viernesbanderadia = true;
        }
        if (Object.entries(this.viernesturno2).length > 0) {
          this.viernesbanderatarde = true;
        }
        this.toastr.info('Horario del especialista Elegido');

      }, err => {
        this.toastr.error('Error en la Api get horario dia doctor');
      }
    );
    this.horarioService.getHorarioEspecialidaddDia(sabado, codigo).subscribe(
      ressabado => {
        const array: any = ressabado;
        const arraydia6: any = [];
        const arraytarde6: any = [];
        for (const obj of array) {
          const par = obj.hora.Turn;
          if (par === parametro1) {
            arraydia6.push(obj);
            this.sabadoturno1 = arraydia6;
          } else if (par === parametro2) {
            arraytarde6.push(obj);
            this.sabadoturno2 = arraytarde6;
          }
        }
        if (Object.entries(this.sabadoturno1).length > 0) {
          this.sabadobanderadia = true;
        }
        if (Object.entries(this.sabadoturno2).length > 0) {
          this.sabadobanderatarde = true;
        }
        this.toastr.info('Horario del especialista Elegido');

      }, err => {
        this.toastr.error('Error en la Api get horario dia doctor');
      }
    );
    console.log(this.lunesturno1);
    console.log(this.lunesturno2);
    console.log(this.martesturno1);
    console.log(this.martesturno2);
    console.log(this.miercolesturno1);
    console.log(this.miercolesturno2);
    console.log(this.juevesturno1);
    console.log(this.juevesturno2);
    console.log(this.viernesturno1);
    console.log(this.viernesturno2);
    console.log(this.sabadoturno1);
    console.log(this.sabadoturno2);
  }
  // editar(wasa) {
  //   console.log(wasa);
  //   this.toastr.warning('la edicion esta disponible en la version platinum');
  //   this.router.navigate(
  //     [
  //       'admin',
  //       'horario',
  //       'update',
  //       wasa
  //     ]
  //   );
  // }
}

