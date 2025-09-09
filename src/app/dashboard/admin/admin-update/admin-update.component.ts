import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../models/admin';
import { Genero } from '../../../models/genero.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-admin-update',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export default class AdminUpdateComponent implements OnInit {
  @ViewChild('file1') fileimagen: any;
  laurlimagen: any;
  datosimagen: any = [];
  usuario: Admin = {
    id: 0,
    Name: '',
    LastName: '',
    Phone: '',
    Email: '',
    Password: '',
    Condition: '',
    ConditionMin: '',
    Photo: '',
    Code: ''
  };
  admin: Admin = {
    id: 0,
    Name: '',
    LastName: '',
    Phone: '',
    Email: '',
    Password: '',
    Condition: '',
    ConditionMin: '',
    Photo: '',
    Code: ''
  };
  estado: Genero [] = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'asistente'
    }
  ];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private photoService: ProfileUploadService,
  ) { }
  onOptionsSelected(event: any) {
    const value = event.target.value;
    this.admin.Condition = value;
    console.log(value);
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
    this.photoService.uploadfoto(files[0], 'foto').subscribe(
      (resimage) => {
        console.log(resimage);
        this.datosimagen = resimage;
        this.laurlimagen = this.datosimagen.data.url;
        console.log(this.laurlimagen);
        this.admin.Photo = this.laurlimagen;
      },
      console.error,
    );
  }
  // tslint:disable-next-line: typedef
  updateAdmin() {
    const params = this.activatedRoute.snapshot.params;
    this.adminService.updateAdmin(params["id"], this.admin).subscribe(
        res => {
          console.log(res);
          this.router.navigate(
            [
              'admin',
              'admin',
              'list'
            ]
          );
          this.toastr.success('actualizando los datos del admin');
        },
        err => {
          console.error(err);
          this.toastr.error('no se pudo actualizar');
        }
      );
  }
  ngOnInit(): void {
    const admin: any = localStorage.getItem('admin');
    this.usuario = JSON.parse(admin);
    console.log(this.usuario);
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.adminService.getAdmin(params["id"]).subscribe(
        res => {
          console.log(res);
          this.admin = res;
        },
        err => console.log(err)
      );
    }
  }

}

