import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from '../../../models/servicio';
import { ProfileUploadService } from '../../../services/imagepriv.service';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-servicio-update',
  standalone: true,
  imports: [],
  templateUrl: './servicio-update.component.html',
  styleUrl: './servicio-update.component.css'
})
export default class ServicioUpdateComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute,
    private servicioService: ServicioService,
    private photoService: ProfileUploadService,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.servicioService.getServicio(params["id"]).subscribe(
        res => {
          console.log(res);
          this.servicio = res;
        },
        err => {
          this.toastr.error('Datos no obtenidos');
        }
      );
    }
  }
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
  updateServicio() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.servicio);
    // llamando a servicio de creacion que esta enlazada con el api
    this.servicioService.updateServicio(params["id"], this.servicio).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'servicio',
            'list'
          ]
        );
        this.toastr.success('servicio actualizado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo actualizar servicio');
      }
    );
  }
}
