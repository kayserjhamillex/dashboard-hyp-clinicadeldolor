import { ToastrService } from 'ngx-toastr';
import { Objetivo } from '../../../models/objetivo';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ObjetivoService } from '../../../services/objetivo.service';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-objetivo-update',
  standalone: true,
  imports: [],
  templateUrl: './objetivo-update.component.html',
  styleUrl: './objetivo-update.component.css'
})
export default class ObjetivoUpdateComponent implements OnInit {
  @ViewChild('file1') fileimagen: any;
  laurlimagen: any;
  datosimagen: any = [];
  cargoimagen = false;
  // declarando los datos del admin
  objetivo: Objetivo = {
    id: 0,
    Title: '',
    Detail: '',
    Image: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private objetivoService: ObjetivoService,
    private photoService: ProfileUploadService,
  ) { }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.objetivoService.getObjetivo(params["id"]).subscribe(
        res => {
          console.log(res);
          this.objetivo = res;
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
  changeImagen() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileimagen.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.photoService.uploadobjetivo(files[0], 'Objetivo').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.objetivo.Image = this.laurlimagen;
        this.cargoimagen = true;
      },
      console.error,
    );
  }
  updateObjetivo() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.objetivo);
    // llamando a servicio de creacion que esta enlazada con el api
    this.objetivoService.updateObjetivo(params["id"], this.objetivo).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'objetivo',
            'list'
          ]
        );
        this.toastr.success('objetivo actualizado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo actualizar objetivo');
      }
    );
  }
}

