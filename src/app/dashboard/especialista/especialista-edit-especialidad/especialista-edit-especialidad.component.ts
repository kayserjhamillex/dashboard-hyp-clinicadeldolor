import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Especialidad } from '../../../models/especialidad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileUploadService } from '../../../services/imagepriv.service';
import { EspecialidadService } from '../../../services/especialidad.service';

@Component({
  selector: 'app-especialista-edit-especialidad',
  standalone: true,
  imports: [],
  templateUrl: './especialista-edit-especialidad.component.html',
  styleUrl: './especialista-edit-especialidad.component.css'
})
export default class EspecialistaEditEspecialidadComponent implements OnInit {
  @ViewChild('file1') fileimagen: any;
  datosimagen: any = [];
  cargoimagen = false;
  laurlimagen: any;
  @ViewChild('file2') fileicono: any;
  datosiconon: any = [];
  cargoicono = false;
  laurlicono: any;
  especialidad: Especialidad = {
    id: 0,
    Name: '',
    Resume: '',
    Image: '',
    Icon: '',
    Price: 0
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private photoService: ProfileUploadService,
    private especialidadService: EspecialidadService,
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.especialidadService.getEspecialidad(params["id"]).subscribe(
        res => {
          console.log(res);
          this.especialidad = res;
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
    this.photoService.uploadservicio(files[0], 'servicio').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.especialidad.Image = this.laurlimagen;
        this.cargoimagen = true;
      },
      console.error,
    );
  }
  // tslint:disable-next-line: typedef
  changeIcono() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileicono.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.photoService.uploadicono(files[0], 'icono').subscribe(
      (resico) => {
        console.log(resico);
        this.datosiconon = resico;
        this.laurlicono = this.datosiconon.data.url;
        console.log(this.laurlicono);
        this.especialidad.Icon = this.laurlicono;
        this.cargoicono = true;

      },
      console.error,
    );
  }
  updateEspecialidad() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.especialidad);
    // llamando a especialidad de creacion que esta enlazada con el api
    this.especialidadService.updateEspecialidad(params["id"], this.especialidad).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'especialista',
            'list'
          ]
        );
        this.toastr.success('especialidad actualizado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo actualizar especialidad');
      }
    );
  }
}

