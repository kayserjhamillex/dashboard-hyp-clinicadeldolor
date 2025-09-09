import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Diagnostico } from '../../../models/diagnostico';
import { DiagnosticoService } from '../../../services/diagnostico.service';

@Component({
  selector: 'app-diagnostico-create',
  standalone: true,
  imports: [],
  templateUrl: './diagnostico-create.component.html',
  styleUrl: './diagnostico-create.component.css'
})
export default class DiagnosticoCreateComponent implements OnInit {
  diagnostico: Diagnostico = {
    id: 0,
    Name: '',
    Detail: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private diagnosticoService: DiagnosticoService,
  ) { }
  saveDiagnostico() {
    delete this.diagnostico.id;
    console.log(this.diagnostico);
    // llamando a servicio de creacion que esta enlazada con el api
    this.diagnosticoService.saveDiagnostico(this.diagnostico).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'diagnostico',
            'list'
          ]
        );
        this.toastr.success('Nuevo diagnostico creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo diagnostico');
      }
    );
  }
  ngOnInit(): void {
  }

}

