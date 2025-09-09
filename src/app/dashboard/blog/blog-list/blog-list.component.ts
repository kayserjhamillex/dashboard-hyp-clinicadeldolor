import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export default class BlogListComponent implements OnInit {
  blogs: any = [] ;
  resultado: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private blogService: BlogService
  ) { }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      res => {
        this.blogs = res;
      },
      err => console.error(err)
    );
  }
  vizualizar(codigo: any) {
    console.log(codigo);
    const codigoaver = codigo;
    this.toastr.info('Ver los comentarios del blog');
    this.router.navigate(
      [
        'admin',
        'comentarios',
        'list',
        codigoaver
      ]
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'blog',
        'create'
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Blog');
    this.router.navigate(
      [
        'admin',
        'blog',
        'update',
        codigoaeditar
      ]
    );
  }
  // tslint:disable-next-line: typedef
  eliminar(codigo: any) {
    console.log(codigo);
    const codigoaeliminar = codigo;
    this.blogService.deleteBlog(codigoaeliminar).subscribe(
      res => {
        if (res) {
          this.resultado = res;
          this.router.navigate(
            [
              'admin',
              'blog',
              'list'
            ]
          );
          this.toastr.success('blog eliminado');
        } else {
          this.toastr.error('no se pudo eliminar');
        }
      }
    )
  }
  ngOnInit(): void {
    this.getBlogs();
  }

}

