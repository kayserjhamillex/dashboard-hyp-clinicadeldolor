import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Tratamiento } from '../../../models/tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';

@Component({
  selector: 'app-tratamiento-create',
  standalone: true,
  imports: [],
  templateUrl: './tratamiento-create.component.html',
  styleUrl: './tratamiento-create.component.css'
})
export default class TratamientoCreateComponent implements OnInit {
  tratamiento: Tratamiento = {
    id: 0,
    Name: '',
    Detail: '',
    Price: 0
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tratamientoService: TratamientoService,
  ) { }
  saveTratamiento() {
    delete this.tratamiento.id;
    console.log(this.tratamiento);
    // llamando a servicio de creacion que esta enlazada con el api
    this.tratamientoService.saveTratamiento(this.tratamiento).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'tratamiento',
            'list'
          ]
        );
        this.toastr.success('Nuevo tratamiento creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo tratamiento');
      }
    );
  }
  ngOnInit(): void {
  }

}

