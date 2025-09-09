import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Banner } from '../../../models/banner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BannerService } from '../../../services/banner.service';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-banner-create',
  standalone: true,
  imports: [],
  templateUrl: './banner-create.component.html',
  styleUrl: './banner-create.component.css'
})
export default class BannerCreateComponent implements OnInit {
  @ViewChild('file1') fileimagen: any;
  laurlimagen: any;
  datosimagen: any = [];
  cargoimagen = false;
  // declarando los datos del banner
  banner: Banner = {
    id: 0,
    Title: '',
    Image: '',
    Condition: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private bannerService: BannerService,
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
    this.photoService.uploadbanner(files[0], 'Banner').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.banner.Image = this.laurlimagen;
        this.cargoimagen = true;
      },
      console.error,
    );
  }
  saveBanner() {
    delete this.banner.id;
    console.log(this.banner);
    // llamando a servicio de creacion que esta enlazada con el api
    this.bannerService.saveBanner(this.banner).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'banner',
            'list'
          ]
        );
        this.toastr.success('Nuevo banner creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo banner');
      }
    );
  }
  ngOnInit(): void {
  }

}

