import { ToastrService } from 'ngx-toastr';
import { Blog } from '../../../models/blog';
import { Parrafo } from '../../../models/parrafo';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ParrafoService } from '../../../services/parrafo.service';
import { VideoUploadService } from '../../../services/video.service';
import { ImageUploadService } from '../../../services/imagen.service';

@Component({
  selector: 'app-blog-update',
  standalone: true,
  imports: [],
  templateUrl: './blog-update.component.html',
  styleUrl: './blog-update.component.css'
})
export default class BlogUpdateComponent implements OnInit {
  blog: Blog = {
    id: 0,
    Title: '',
    Resume: '',
    Image: '',
    Video: ''
  };
  @ViewChild('file1') fileimagen: any;
  datosimagen: any = [];
  laurlimagen: any;
  @ViewChild('file2') filevideo: any;
  datosvideo: any = [];
  laurlvideo: any;
  cambio1 = true;
  igual1 = true;
  cambio2 = true;
  igual2 = true;
  parrafos: any = [];
  mensaje: any;
  mensaje1: any;
  elparrafo: Parrafo = {
    id: 0,
    Subtitle: '',
    Paragraph: '',
    Image: '',
    Video: '',
    BlogId: 0
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private parrafoService: ParrafoService,
    private videoService: VideoUploadService,
    private imagenService: ImageUploadService,
  ) { }

  // tslint:disable-next-line: typedef
  changeImagen() {
    this.fileimagen.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeMedia() {
    this.filevideo.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeImage() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileimagen.nativeElement.files;
    // let progress = this.uploadService.upload(images);
    this.imagenService.uploadimage(files[0], 'image').subscribe(
      (resimage: any) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.blog.Image = this.laurlimagen;
      },
      console.error,
    );
  }
  // tslint:disable-next-line: typedef
  changeVideo() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.filevideo.nativeElement.files;
    // let progress = this.uploadService.upload(images);
    this.videoService.uploadvideo(files[0], 'video').subscribe(
      (resvideo: any) => {
        console.log(resvideo);
        this.datosvideo = resvideo;
        this.laurlvideo = this.datosvideo.data.url;
        console.log(this.laurlvideo);
        this.blog.Video = this.laurlvideo;
      },
      console.error,
    );
  }
  // tslint:disable-next-line: typedef
  updateBlog() {
    // tslint:disable-next-line: one-variable-per-declaration
    const params = this.activatedRoute.snapshot.params;
    this.blogService.updateBlog(params["id"], this.blog).subscribe(
        res => {
          console.log(res);
          this.mensaje1 = res;
          this.toastr.success('actualizando los datos del blog');
        },
        err => {
          console.error(err);
          this.toastr.error('no se pudo actualizar');
        }
      );
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    const codigo = params["id"];
    if (params["id"]) {
      this.blogService.getBlog(codigo).subscribe(
        res => {
          this.blog = res;
          this.toastr.info('datos del blog');
        },
        err => {
          this.toastr.error('no se pudo sacar los datos del blog');
        }
      );
      this.parrafoService.getBlog(codigo).subscribe(
        res => {
          if (res) {
            this.parrafos = res;
            console.log(res);
            this.toastr.info('los parrafos del blog');
          } else {
            this.toastr.error('no se pudo traer los parrafos del blog');
          }
        }
      );
    }
  }
  elegir(dato: any) {
    this.parrafoService.getParrafo(dato).subscribe(
      res => {
        this.elparrafo = res;
      },
      err => {
        this.toastr.error('no se pudo acceder');
      }
    );
  }
  updateparrafo(codigazo: number, elparrafo: string) {
    const params = this.activatedRoute.snapshot.params;
    const elcodigo = params["id"];
    const parrafin = {
      id: codigazo,
      Parrafo: elparrafo,
      BlogId: elcodigo
    }
    this.parrafoService.updateParrafo(codigazo, parrafin).subscribe(
      res => {
        if (res) {
          this.mensaje = res;
          this.router.navigate(
            [
              'admin',
              'blog',
              'update',
              elcodigo
            ]
          );
          this.toastr.info('se actualizo correctamente');
        } else {
          this.toastr.error('no se pudo actualizar');
        }
      }
    );
  }

  delete(dato: any) {
    const params = this.activatedRoute.snapshot.params;
    const elcodigo = params["id"];
    const parametro = dato.id;
    const indice = this.parrafos.indexOf(dato);
    this.parrafoService.deleteParrafo(parametro).subscribe(
      res => {
        if (res) {
          this.mensaje = res;
          console.log(this.mensaje);
          this.parrafos.splice(indice, 1);
          this.toastr.info('parrafo eliminado correctamente');
          this.router.navigate(
            [
              'admin',
              'blog',
              'update',
              elcodigo
            ]
          );
        } else {
          this.toastr.error('no se pudo eliminar');
        }
      }
    )
  }

  finish() {
    this.router.navigate(
      [
        'admin',
        'blog',
        'list'
      ]
    );
  }

}

