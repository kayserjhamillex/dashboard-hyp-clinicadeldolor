import { ToastrService } from 'ngx-toastr';
import { Doctor } from '../../../models/doctor';
import { Router, ActivatedRoute } from '@angular/router';
import { Especialidad } from '../../../models/especialidad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { ListEspecialista } from '../../../models/listespecialista';
import { ProfileUploadService } from '../../../services/imagepriv.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialistaService } from '../../../services/especialista.service';

@Component({
  selector: 'app-especialista-add',
  standalone: true,
  imports: [],
  templateUrl: './especialista-add.component.html',
  styleUrl: './especialista-add.component.css'
})
export default class EspecialistaAddComponent implements OnInit {
  @ViewChild('file2') fileimagen2: any;
  datosimagen2: any = [];
  cargoimagen2 = false;
  laurlimagen2: any;
  @ViewChild('file3') fileicono: any;
  datosiconon: any = [];
  especialistas: any = [];
  cargoicono = false;
  laurlicono: any;
  especialidades: any = [];
  doctor: Doctor = {
    id: 0,
    Name: '',
    LastName: '',
    MedicalSchoolNumber: '',
    Email: '',
    Password: '',
    Photo: '',
    Code: '',
    Condition: ''
  };
  especialidad: Especialidad = {
    id: 0,
    Name: '',
    Resume: '',
    Image: '',
    Icon: '',
    Price: 0
  };
  especialidad1: Especialidad = {
    id: 0,
    Name: '',
    Resume: '',
    Image: '',
    Icon: '',
    Price: 0
  };
  especialista: ListEspecialista = {
    id: 0,
    Turn: '',
    EspecialidadId: 0,
    DoctorId: 0,
  };
  especialista1: ListEspecialista = {
    id: 0,
    Turn: '',
    EspecialidadId: 0,
    DoctorId: 0,
  };
  codigodoctor: any = 0;
  codigoespecialidad: any = 0;
  especialidadbuscar = true;
  especialidadcreate = false;
  resultadoespecialidad = false;
  bandera = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute,
    private photoService: ProfileUploadService,
    private especialidadService: EspecialidadService,
    private especialistaService: EspecialistaService,
  ) { }
  crear2() {
    this.especialidadcreate = true;
    this.especialidadbuscar = false;
    this.resultadoespecialidad = false;
  }
  // tslint:disable-next-line: typedef
  onOptionsSelectedEspecialidad(event: any) {
    const value = event.target.value;
    this.codigoespecialidad = value;
    this.especialidadService.getEspecialidad(this.codigoespecialidad.toString()).subscribe(
      resespecialidad => {
        this.especialidad1 = resespecialidad;
        this.toastr.info('Especialidad elegida');
        this.resultadoespecialidad = true;
        this.especialidadbuscar = false;
        this.especialidadcreate = false;
      }, err => {
        this.toastr.error('Error Api get especialidad');
      }
    );
    console.log(value);
  }
  changeImg2() {
    this.fileimagen2.nativeElement.click();
  }
  // tslint:disable-next-line: typedef
  changeIco() {
    this.fileicono.nativeElement.click();
  }
  changeImagen2() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileimagen2.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.photoService.uploadimage(files[0], 'image').subscribe(
      (resimage) => {
        this.datosimagen2 = resimage;
        this.laurlimagen2 = this.datosimagen2.data.url;
        this.especialidad.Image = this.laurlimagen2;
        this.cargoimagen2 = true;
      },
      console.error,
    );
  }
  // tslint:disable-next-line: typedef
  changeIcono() {
    // this.showAvatarUpload = true;
    const files: { [key: string]: File } = this.fileicono.nativeElement.files;
    console.log(files);
    // let progress = this.uploadService.upload(images);
    this.photoService.uploadicono(files[0], 'icono').subscribe(
      (resico) => {
        console.log(resico);
        this.datosiconon = resico;
        this.laurlicono = this.datosiconon.data.url;
        console.log(this.laurlicono);
        this.especialidad.Icon = this.laurlicono;
        this.cargoicono = true;

      },
      console.error,
    );
  }
  getespecialidades() {
    this.especialidadService.getEspecialidads().subscribe(
      res => {
        this.especialidades = res;
        console.log(res);

      },
      err => {
        console.error(err);
      }
    );
  }
  saveEspecialidad() {
    delete this.especialidad.id;
    console.log(this.especialidad);
    // llamando a especialidad de creacion que esta enlazada con el api
    this.especialidadService.saveEspecialidad(this.especialidad).subscribe(
      res => {
        this.especialidad1 = res;
        this.codigoespecialidad = this.especialidad1.id;
        this.especialista.EspecialidadId = this.codigoespecialidad;
        console.log(res);
        this.toastr.success('Nuevo especialidad creado');
        this.resultadoespecialidad = true;
        this.especialidadcreate = false;
        this.especialidadbuscar = false;
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo crear un nuevo especialidad');
      }
    );
  }
  saveEspecialista() {
    this.especialista.EspecialidadId = +this.codigoespecialidad;
    this.especialista.DoctorId = +this.codigodoctor;
    this.especialistaService.getEspecialistaFilterDoctor(this.especialista.DoctorId).subscribe(
      resesp => {
        this.especialistas = resesp;
        delete this.especialista.id;
        const parametro = this.especialista.EspecialidadId;
        for (const item of this.especialistas) {
          const atributo = item.EspecialidadId;
          if (parametro === atributo) {
            this.bandera = true;
          }
        }
        if (this.bandera === false) {
          this.especialistaService.saveEspecialista(this.especialista).subscribe(
            resaveesp => {
              console.log(resaveesp);
              this.toastr.success('Nuevo especialista creado');
            },
            err => {
              console.error(err);
              this.toastr.error('no se pudo crear un nuevo especialista');
            }
          );
        } else if (this.bandera === true) {
          this.toastr.info('No se puede registrar una misma especialidad para el doctor');
          window.location.reload();
        }
      }, err => {
        this.toastr.error('Error en la Api');
      }
    );
  }
  // atras() {
  //   const codigoadd = this.activatedRoute.snapshot.params["id"];
  //   this.router.navigate(
  //     [
  //       'admin',
  //       'especialista',
  //       'add',
  //       codigoadd
  //     ]
  //     );
  // }
  ngOnInit(): void {
    this.getespecialidades();
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.doctorService.getDoctor(params["id"]).subscribe(
        res => {
          console.log(res);
          this.doctor = res;
          this.codigodoctor = this.doctor.id;
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  finish() {
    this.router.navigate(
      [
        'admin',
        'especialista',
        'list'
      ]
    );
  }

}
