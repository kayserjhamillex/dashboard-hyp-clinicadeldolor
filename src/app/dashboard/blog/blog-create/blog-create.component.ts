import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../../../models/blog';
import { Parrafo } from '../../../models/parrafo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ParrafoService } from '../../../services/parrafo.service';
import { VideoUploadService } from '../../../services/video.service';
import { ImageUploadService } from '../../../services/imagen.service';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.css'
})
export default class BlogCreateComponent implements OnInit {
  blog: Blog = {
    id: 0,
    Title: '',
    Resume: '',
    Image: '',
    Video: ''
  };
  blog1: Blog = {
    id: 0,
    Title: '',
    Resume: '',
    Image: '',
    Video: ''
  };
  dato: Parrafo = {
    id: 0,
    Subtitle: '',
    Paragraph: '',
    Image: '',
    Video: '',
    BlogId: 0
  }
  bandera = false;
  codigoblog: any;
  @ViewChild('file1') fileimagen: any;
  @ViewChild('file2') filevideo: any;
  laurlimagen: any;
  laurlvideo: any;
  datosimagen: any = [];
  datosvideo: any = [];
  parrafos: any = [];
  mensaje: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private blogService: BlogService,
    private parrafoService: ParrafoService,
    private videoService: VideoUploadService,
    private imagenService: ImageUploadService,
  ) { }
  changeImg() {
    this.fileimagen.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeMedia() {
    this.filevideo.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeImagen() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileimagen.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.imagenService.uploadimage(files[0], 'image').subscribe(
      (resimage) => {
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
      (resvideo) => {
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
  saveBlog() {
    delete this.blog.id;
    console.log(this.blog);
    this.blogService.saveBlog(this.blog).subscribe(
      res => {
        this.blog1 = res;
        this.codigoblog = this.blog1.id;
        this.dato.BlogId = this.codigoblog;
        this.bandera = true;
        this.toastr.success('Nuevo blog creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo blog');
      }
    );
  }
  saveParrafo() {
    console.log(this.dato);
    this.parrafoService.saveParrafo(this.dato).subscribe(
      res => {
        if (res) {
          this.parrafos.push(this.dato);
          this.toastr.info('parrafo creado');
        } else {
          this.toastr.error('no se puede crear el parrafo');
        }
      }
    )
  }
  delete(dato: any) {
    console.log(dato);
    const parametro = dato.id;
    const indice = this.parrafos.indexOf(dato);
    this.parrafoService.deleteParrafo(parametro).subscribe(
      res => {
        if (res) {
          this.mensaje = res;
          this.parrafos.splice(indice, 1);
          this.toastr.info('parrafo eliminado correctamente');
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
  ngOnInit(): void {
  }

}

