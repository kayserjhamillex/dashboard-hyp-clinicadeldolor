import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';
import { Genero } from '../../../models/genero.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.css'
})
export default class ClienteCreateComponent implements OnInit {
  @ViewChild('file1') fileimagen: any;
  laurlimagen: any;
  datosimagen: any = [];
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
    Code: '99999999',
    G: '',
    P: '',
    A: '',
    C: '',
    Fum: new Date(),
    Papsmear: '',
    Bloodtype: '',
    Others: '',
    Othershereditary: '',
    Otherspathological: '',
    Medicine: ''
  };
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
  hombre = 'https://res.cloudinary.com/jx-design/image/upload/v1648169965/Foto/zsvozr0bufvjujb72p9e.jpg';
  mujer = 'https://res.cloudinary.com/jx-design/image/upload/v1648170120/Foto/qukeq97u2cebdmqpqyua.jpg';
  fechamin: Date | undefined;
  fechamax: Date | undefined;
  stringmax: any;
  stringmin: any;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private photoService: ProfileUploadService,
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
  changeImg() {
    this.fileimagen.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeImagen() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileimagen.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.photoService.uploadfoto(files[0], 'foto').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.cliente.Photo = this.laurlimagen;
      },
      console.error,
    );
  }
  // tslint:disable-next-line: typedef
  saveCliente() {
    this.cliente.Fum = this.cliente.BirthDate;
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
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'cliente',
            'list'
          ]
        );
        this.toastr.success('Nuevo cliente creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo cliente');
      }
    );
  }
  ngOnInit(): void {
    this.fechamin = new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate());
    this.fechamax = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this.stringmin = this.pd.transform(this.fechamin, 'yyyy-MM-dd');
    this.stringmax = this.pd.transform(this.fechamax, 'yyyy-MM-dd');
  }

}

