import { ToastrService } from 'ngx-toastr';
import { Banner } from '../../../models/banner';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BannerService } from '../../../services/banner.service';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-banner-update',
  standalone: true,
  imports: [],
  templateUrl: './banner-update.component.html',
  styleUrl: './banner-update.component.css'
})
export default class BannerUpdateComponent implements OnInit {
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
    private activatedRoute: ActivatedRoute,
    private photoService: ProfileUploadService,
  ) { }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.bannerService.getBanner(params["id"]).subscribe(
        res => {
          console.log(res);
          this.banner = res;
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
  updateBanner() {
    const params = this.activatedRoute.snapshot.params;
    console.log(this.banner);
    // llamando a servicio de creacion que esta enlazada con el api
    this.bannerService.updateBanner(params["id"], this.banner).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'banner',
            'list'
          ]
        );
        this.toastr.success('Banner Actualizado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo actualizar banner');
      }
    );
  }
}

