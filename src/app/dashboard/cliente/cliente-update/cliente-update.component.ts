import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';
import { Genero } from '../../../models/genero.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-cliente-update',
  standalone: true,
  imports: [],
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})
export default class ClienteUpdateComponent implements OnInit {
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
    Condition: '',
    Code: ''
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
  lafecha: Date | undefined;
  fechamin: Date | undefined;
  fechamax: Date | undefined;
  stringmax: any;
  stringmin: any;
  stringfecha: any;
  nuevafecha: Date | undefined;
  constructor(
    private pd: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private photoService: ProfileUploadService,
  ) { }
  cambio(event: any) {
    console.log(event);
    this.cliente.BirthDate = event;
  }
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

  updateCliente() {
    const params = this.activatedRoute.snapshot.params;
    this.clienteService.updateCliente(params["id"], this.cliente).subscribe(
        res => {
          console.log(res);
          this.router.navigate(
            [
              'admin',
              'cliente',
              'list'
            ]
          );
          this.toastr.success('actualizando los datos del cliente');
        },
        err => {
          console.error(err);
          this.toastr.error('no se pudo actualizar');
        }
      );
  }
  ngOnInit(): void {
    this.fechamin = new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate());
    this.fechamax = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this.stringmin = this.pd.transform(this.fechamin, 'yyyy-MM-dd');
    this.stringmax = this.pd.transform(this.fechamax, 'yyyy-MM-dd');
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.clienteService.getCliente(params["id"]).subscribe(
        res => {
          console.log(res);
          this.cliente = res;
          const lafecha: any = this.cliente.BirthDate;
          const fecha: Date = lafecha;
          const dia = new Date(fecha).getDate() + 1;
          const mes = new Date(fecha).getMonth();
          const anio = new Date(fecha).getFullYear();
          this.lafecha = new Date(anio, mes, dia);
          this.stringfecha = this.pd.transform(this.lafecha, 'yyyy-MM-dd');
          console.log(this.stringfecha);
        },
        err => console.log(err)
      );
    }
  }
}
