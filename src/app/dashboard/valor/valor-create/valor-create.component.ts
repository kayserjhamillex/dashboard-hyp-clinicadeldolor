import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Valor } from '../../../models/valor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ValorService } from '../../../services/valor.service';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-valor-create',
  standalone: true,
  imports: [],
  templateUrl: './valor-create.component.html',
  styleUrl: './valor-create.component.css'
})
export default class ValorCreateComponent implements OnInit {
  @ViewChild('file1') fileimagen: any;
  laurlimagen: any;
  datosimagen: any = [];
  cargoimagen = false;
  // declarando los datos del valor
  valor: Valor = {
    id: 0,
    Name: '',
    Detail: '',
    Image: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private valorService: ValorService,
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
    this.photoService.uploadsvalor(files[0], 'Valor').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.valor.Image = this.laurlimagen;
        this.cargoimagen = true;
      },
      console.error,
    );
  }
  saveValor() {
    delete this.valor.id;
    console.log(this.valor);
    // llamando a servicio de creacion que esta enlazada con el api
    this.valorService.saveValor(this.valor).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'valor',
            'list'
          ]
        );
        this.toastr.success('Nuevo valor creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo valor');
      }
    );
  }
  ngOnInit(): void {
  }
}

