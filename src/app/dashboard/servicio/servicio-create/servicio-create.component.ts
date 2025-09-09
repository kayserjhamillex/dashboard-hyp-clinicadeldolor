import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from '../../../models/servicio';
import { ProfileUploadService } from '../../../services/imagepriv.service';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-servicio-create',
  standalone: true,
  imports: [],
  templateUrl: './servicio-create.component.html',
  styleUrl: './servicio-create.component.css'
})
export default class ServicioCreateComponent implements OnInit {
  @ViewChild('file1') fileimagen: any;
  datosimagen: any = [];
  cargoimagen = false;
  laurlimagen: any;
  @ViewChild('file2') fileicono: any;
  datosiconon: any = [];
  cargoicono = false;
  laurlicono: any;
  servicio: Servicio = {
    id: 0,
    Name: '',
    Resume: '',
    Image: '',
    Icon: '',
    Price: 0
  }
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private servicioService: ServicioService,
    private photoService: ProfileUploadService,
  ) { }
  // tslint:disable-next-line: typedef
  changeImg() {
    this.fileimagen.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeIco() {
    this.fileicono.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeImagen() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileimagen.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.photoService.uploadservicio(files[0], 'Imagen').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.servicio.Image = this.laurlimagen;
        this.cargoimagen = true;
      },
      console.error,
    );
  }
  // tslint:disable-next-line: typedef
  changeIcono() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileimagen.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.photoService.uploadservicio(files[0], 'Icono').subscribe(
      (resico) => {
        console.log(resico);
        this.datosiconon = resico;
        this.laurlicono = this.datosiconon.data.url;
        console.log(this.laurlicono);
        this.servicio.Icon = this.laurlicono;
        this.cargoicono = true;

      },
      console.error,
    );
  }
  saveServicio() {
    delete this.servicio.id;
    console.log(this.servicio);
    // llamando a servicio de creacion que esta enlazada con el api
    this.servicioService.saveServicio(this.servicio).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'servicio',
            'list'
          ]
        );
        this.toastr.success('Nuevo servicio creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo servicio');
      }
    );
  }
  ngOnInit(): void {
  }

}

