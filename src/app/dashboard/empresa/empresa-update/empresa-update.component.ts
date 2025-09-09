import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from '../../../models/empresa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from '../../../services/empresa.service';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-empresa-update',
  standalone: true,
  imports: [],
  templateUrl: './empresa-update.component.html',
  styleUrl: './empresa-update.component.css'
})
export default class EmpresaUpdateComponent implements OnInit {
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
  @ViewChild('file1', {static: true}) filelogo: any;
  datoslogo: any = [];
  laurllogo: any;
  @ViewChild('file2', {static: true}) filebanner1: any;
  datosbanner1: any = [];
  laurlvbanner1: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private empresaService: EmpresaService,
    private imagenpriv: ProfileUploadService
  ) { }

  // tslint:disable-next-line: typedef
  changeLogo() {
    this.filelogo.nativeElement.click();
  }

  // tslint:disable-next-line: typedef
  changeLogito() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.filelogo.nativeElement.files;
    // let progress = this.uploadService.upload(images);
    this.imagenpriv.uploadlogosmall(files[0], 'logosmall').subscribe(
      (reslogo) => {
        console.log(reslogo);
        this.datoslogo = reslogo;
        this.laurllogo = this.datoslogo.data.url;
        console.log(this.laurllogo);
        this.empresa.Logo = this.laurllogo;
      },
      console.error,
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
  // tslint:disable-next-line: typedef
  updateEmpresa() {
    const codigo = '1';
    this.empresaService.updateEmpresa(codigo, this.empresa).subscribe(
        res => {
          console.log(res);
          this.router.navigate(
            [
              'admin',
              'empresa',
              'view'
            ]
          );
          this.toastr.success('actualizando los datos de la empresa');
        },
        err => {
          console.error(err);
          this.toastr.error('no se pudo actualizar');
        }
      );
  }

}

