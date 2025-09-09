import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from '../../../models/empresa';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-empresa-view',
  standalone: true,
  imports: [],
  templateUrl: './empresa-view.component.html',
  styleUrl: './empresa-view.component.css'
})
export default class EmpresaViewComponent implements OnInit {
  empresa: Empresa = {
    id: 0,
    Name: '',
    BusinessName: '',
    Address: '',
    Email: '',
    Phone: '',
    Phone2: '',
    Logo: '',
    History: '',
    Mision: '',
    Vision: ''
  };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private empresaService: EmpresaService,
  ) { }

  // tslint:disable-next-line: typedef
  editar() {
    this.router.navigate(
      [
        'admin',
        'empresa',
        'update'
      ]
    );
  }

  ngOnInit(): void {
    const codigo = '1';
    if (codigo) {
      this.empresaService.getEmpresa(codigo).subscribe(
        res => {
          console.log(res);
          this.empresa = res;
        },
        err => console.log(err)
      );
    }
  }

}

