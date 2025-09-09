import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TestimonioService } from '../../../services/testimonio.service';

@Component({
  selector: 'app-testimonio-list',
  standalone: true,
  imports: [],
  templateUrl: './testimonio-list.component.html',
  styleUrl: './testimonio-list.component.css'
})
export default class TestimonioListComponent implements OnInit {
  testimonios: any = [] ;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private testimonioService: TestimonioService,
  ) { }

  ngOnInit(): void {
    this.getTestimonios();
  }
  // tslint:disable-next-line: typedef
  getTestimonios() {
    this.testimonioService.getTestimonios().subscribe(
      res => {
        this.testimonios = res;
      },
      err => console.error(err)
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'testimonio',
        'create'
      ]
    );
  }

  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Testimonio');
    this.router.navigate(
      [
        'admin',
        'testimonio',
        'update',
        codigoaeditar
      ]
    );
  }

}

