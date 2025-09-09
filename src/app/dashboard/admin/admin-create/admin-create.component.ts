import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../../models/admin';
import { Genero } from '../../../models/genero.model';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileUploadService } from '../../../services/imagepriv.service';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export default class AdminCreateComponent implements OnInit {
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
  // declarando los datos del admin
  admin: Admin = {
    id: 0,
    Name: '',
    LastName: '',
    Phone: '',
    Email: '',
    Password: '123',
    Condition: 'asistente',
    ConditionMin: 'desactivado',
    Photo: 'https://st.depositphotos.com/2704315/3185/v/600/depositphotos_31854223-stock-illustration-vector-user-profile-avatar-man.jpg',
    Code: '9999999'
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
  // creando metodo para crear un nuevo admin
  // tslint:disable-next-line: typedef
  saveAdmin() {
    delete this.admin.id;
    console.log(this.admin);
    // this.admin.Password = this.admin.Phone;
    // llamando a servicio de creacion que esta enlazada con el api
    this.adminService.saveAdmin(this.admin).subscribe(
      res => {
        console.log(res);
        this.router.navigate(
          [
            'admin',
            'admin',
            'list'
          ]
        );
        this.toastr.success('Nuevo admin creado');
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo admin');
      }
    );
  }
  ngOnInit(): void {
    const dato: any = localStorage.getItem("admin");
    this.usuario = JSON.parse(dato);
  }

}

