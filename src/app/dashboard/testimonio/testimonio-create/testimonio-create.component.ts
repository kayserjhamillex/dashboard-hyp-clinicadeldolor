import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { Genero } from '../../../models/genero.model';
import { ListTestimonio } from '../../../models/listtest';
import { ClienteService } from '../../../services/cliente.service';
import { TestimonioService } from '../../../services/testimonio.service';

@Component({
  selector: 'app-testimonio-create',
  standalone: true,
  imports: [],
  templateUrl: './testimonio-create.component.html',
  styleUrl: './testimonio-create.component.css'
})
export default class TestimonioCreateComponent implements OnInit {
  testimonio: ListTestimonio = {
    id: 0,
    Testimony: '',
    ClienteId: 0
  };
  dato: any = '';
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
    Condition: 'desactivado',
    Code: '99999999'
  };
  cliente1: Cliente = {
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
    Google: '',
    Condition: '',
    Code: ''
  };
  botones = true;
  buscar = false;
  crear = false;
  datoscliente = false;
  codigocliente: any;
  genero: Genero [] = [
    {
      id: 1,
      name: 'Masculino'
    },
    {
      id: 2,
      name: 'Femenino'
    }
  ];
  estadocivil: Genero [] = [
    {
      id: 1,
      name: 'Soltero'
    },
    {
      id: 2,
      name: 'Casado'
    },
    {
      id: 3,
      name: 'Divorciado'
    },
    {
      id: 4,
      name: 'Viudo'
    },
    {
      id: 5,
      name: 'Concubinato'
    },
    {
      id: 6,
      name: 'Separación en proceso'
    },
    {
      id: 7,
      name: 'Separado'
    }
  ];
  hombre = 'https://fieldsports.herokuapp.com/stylesheets/usuarios/man.png';
  mujer = 'https://fieldsports.herokuapp.com/stylesheets/usuarios/women.png';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private testimonioService: TestimonioService,
  ) { }
  // tslint:disable-next-line: typedef
  onOptionsSelected(event: any) {
    const value = event.target.value;
    this.cliente.Gender = value;
    console.log(value);
  }
  // tslint:disable-next-line: typedef
  onOptionsSelectedStatus(event: any) {
    const value = event.target.value;
    this.cliente.CivilStatus = value;
    console.log(value);
  }
  // tslint:disable-next-line: typedef
  buscarcliente() {
    this.buscar = true;
    // console.log(this.buscar);
    this.botones = false;
    // console.log(this.botones);
  }
  // tslint:disable-next-line: typedef
  crearcliente() {
    this.crear = true;
    // console.log(this.crear);
    this.botones = false;
    // console.log(this.botones);
  }
  // tslint:disable-next-line: typedef
  saveCliente() {
    if (this.cliente.Gender === 'Masculino') {
      this.cliente.Photo = this.hombre;
    } else if (this.cliente.Gender === 'Femenino') {
      this.cliente.Photo = this.mujer;
    }
    this.cliente.Password = this.cliente.DocumentNumber;
    delete this.cliente.id;
    console.log(this.cliente);
    this.clienteService.saveCliente(this.cliente).subscribe(
      res => {
        this.cliente1 = res;
        this.codigocliente = this.cliente1.id;
        this.toastr.success('Nuevo cliente creado');
        this.datoscliente = true;
        this.crear = false;
      },
      err => {
        // console.error(err);
        this.toastr.error('no se pudo crear un nuevo cliente');
      }
    );
  }
  // tslint:disable-next-line: typedef
  searchEmailCliente() {
    // console.log(this.dato);
    this.clienteService.getClientecorreo(this.dato).subscribe(
      res => {
        this.cliente1 = res;
        this.codigocliente = this.cliente1.id;
        this.toastr.success('Cliente encontrado');
        this.dato = '';
        this.datoscliente = true;
        this.buscar = false;
      },
      err => {
        // console.error(err);
        this.toastr.error('no se pudo encotrar cliente');
      }
    );
  }
  // tslint:disable-next-line: typedef
  searchDocCliente() {
    // console.log(this.dato);
    this.clienteService.getClientedoc(this.dato).subscribe(
      res => {
        this.cliente1 = res;
        this.codigocliente = this.cliente1.id;
        this.toastr.success('Cliente encontrado');
        this.dato = '';
        this.datoscliente = true;
        this.buscar = false;
      },
      err => {
        // console.error(err);
        this.toastr.error('no se pudo encotrar cliente');
      }
    );
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  createTestimonio() {
    this.testimonio.ClienteId = this.codigocliente;
    delete this.testimonio.id;
    console.log(this.testimonio);
    this.testimonioService.saveTestimonio(this.testimonio).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'testimonio',
            'list'
          ]
        );
        this.toastr.success('Nuevo testimonio creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo testimonio');
      }
    );
  }

}
