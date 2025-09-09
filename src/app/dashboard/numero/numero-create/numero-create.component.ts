import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Numero } from '../../../models/numero';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NumeroService } from '../../../services/numero.service';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-numero-create',
  standalone: true,
  imports: [],
  templateUrl: './numero-create.component.html',
  styleUrl: './numero-create.component.css'
})
export default class NumeroCreateComponent implements OnInit {
  @ViewChild('file1') fileimagen: any;
  laurlimagen: any;
  datosimagen: any = [];
  cargoimagen = false;
  // declarando los datos del numero
  numero: Numero = {
    id: 0,
    Name: '',
    Image: '',
    Count: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private numeroService: NumeroService,
    private photoService: ProfileUploadService,
  ) { }
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
    this.photoService.uploadnumero(files[0], 'Numero').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.numero.Image = this.laurlimagen;
        this.cargoimagen = true;
      },
      console.error,
    );
  }
  saveNumero() {
    delete this.numero.id;
    console.log(this.numero);
    // llamando a servicio de creacion que esta enlazada con el api
    this.numeroService.saveNumero(this.numero).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'numero',
            'list'
          ]
        );
        this.toastr.success('Nuevo numero creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo numero');
      }
    );
  }
  ngOnInit(): void {
  }

}

