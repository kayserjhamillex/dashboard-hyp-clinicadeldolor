import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tipo } from '../../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { TipodosService } from '../../../services/tipodos.service';
import { LaboratoriodosService } from '../../../services/laboratoriodos.service';
import { LaboratoriodoscitaService } from '../../../services/laboratoriodoscita.service';

@Component({
  selector: 'app-laboratorio-list',
  standalone: true,
  imports: [],
  templateUrl: './laboratorio-list.component.html',
  styleUrl: './laboratorio-list.component.css'
})
export default class LaboratorioListComponent implements OnInit {
  rxtmrm: any = [];
  laboratorios: any = [];
  tipos: any = [];
  bandera = false;
  tipo: Tipo = {
    id: 0,
    Name: ''
  };
  mensaje: any;
  mensaje1: any;
  codigotipo: any;
  parametrito: any;
  mensajerxtmrm: any;
  mensajelaboratorio: any;
  hayrxtmrm = false;
  haylaboratorios = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tipoService: TipodosService,
    private rxtmrmService: LaboratoriodoscitaService,
    private laboratorioService: LaboratoriodosService,
  ) { }
  ngOnInit(): void {
    // this.getlaboratorios();
    this.gettipos();
  }
  gettipos() {
    this.tipoService.getTipodoss().subscribe(
      res => {
        this.tipos = res;
      }, err => {
        this.toastr.error('Error Api tipo');
      }
    );
  }
  ver(codigo: any) {
    const parametro = codigo;
    this.codigotipo = codigo;
    this.laboratorioService.getLaboratorioTipo(parametro).subscribe(
      res => {
        this.laboratorios = res;
      },
      err => {
        this.toastr.error('Error Api List Laboratorios del Tipo');
      }
    );
  }
  updateTipo() {
    // llamando a laboratorio de creacion que esta enlazada con el api
    this.tipoService.updateTipodos(this.codigotipo, this.tipo).subscribe(
      res => {
        console.log(res);
        this.mensaje = res;
        this.toastr.success('Tipo actualizado');
        this.bandera = false;
      },
      err => {
        console.error(err);
        this.toastr.error('no se pudo actualizar tipo');
      }
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'rx-tm-rm',
        'create'
      ]
    );
  }
  edit(codigo: any) {
    this.bandera = true;
    this.codigotipo = codigo;
    this.tipoService.getTipodos(codigo).subscribe(
      res => {
        this.tipo = res;
      }, err => {
        this.toastr.error('Error api tipo get');
      }
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Tipo');
    this.router.navigate(
      [
        'admin',
        'laboratorio',
        'update',
        codigoaeditar
      ]
    );
  }
  deleteTipo(codigo: any) {
    let numerorxtmrm;
    let numerolaboratorios;
    this.parametrito = codigo;
    this.rxtmrmService.getrxtmrmotipo(this.parametrito).subscribe(
      reslistana => {
        this.rxtmrm = reslistana;
        numerorxtmrm = Object.entries(this.rxtmrm).length;
        if (numerorxtmrm > 0) {
          this.hayrxtmrm = true;
        }
      }, err => {
        this.toastr.error('Error Api get analisis viculados a tipo');
      }
    );
    this.laboratorioService.getLaboratorioTipo(this.parametrito).subscribe(
      reslistlab => {
        this.laboratorios = reslistlab;
        numerolaboratorios = Object.entries(this.laboratorios).length;
        if (numerolaboratorios > 0) {
          this.haylaboratorios = true;
        }
      }, err => {
        this.toastr.error('Error Api get laboratorio del Tipo');
      }
    );
    if (confirm('¿Estas seguro de eliminar tipo? - eliminaras tambien la vinculacion con las citas y sus laboratorios')) {
      console.log(this.rxtmrm);
      console.log(this.laboratorios);
      if (this.hayrxtmrm === true) {
        setTimeout(
          () => {
            for (const item of this.rxtmrm) {
              const parametro = item.id;
              this.rxtmrmService.deleteLaboratoriocita(parametro).subscribe(
                resdelextmrm => {
                  this.mensaje = resdelextmrm;
                  console.log('rxtmrm eliminado');
                }, err => {
                  this.toastr.error('Error api delete rxtmrm');
                }
              );
            }
          },
          1000
        );
        if (this.haylaboratorios === true) {
          setTimeout(
            () => {
              for (const item of this.laboratorios) {
                const parametro = item.id;
                this.laboratorioService.deleteLaboratorio(parametro).subscribe(
                  resdellab => {
                    this.mensaje = resdellab;
                    console.log('laboratorio eliminado');
                  }, err => {
                    this.toastr.error('Error api delete laboratorio');
                  }
                );
              }
            },
            1000
          );
          setTimeout(
            () => {
              this.tipoService.deleteTipodos(this.parametrito).subscribe(
                resdeltipo => {
                  this.mensaje = resdeltipo;
                  window.location.reload();
                  console.log('tipo eliminado');
                }, err => {
                  this.toastr.error('Error api delete tipodos');
                }
              );
            },
            1000
          );
        } else {
          setTimeout(
            () => {
              this.tipoService.deleteTipodos(this.parametrito).subscribe(
                resdeltipo => {
                  this.mensaje = resdeltipo;
                  window.location.reload();
                  console.log('tipo eliminado');
                }, err => {
                  this.toastr.error('Error api delete tipo');
                }
              );
            },
            1000
          );
        }
      } else {
        if (this.haylaboratorios === true) {
          setTimeout(
            () => {
              for (const item of this.laboratorios) {
                const parametro = item.id;
                this.laboratorioService.deleteLaboratorio(parametro).subscribe(
                  resdellab => {
                    this.mensaje = resdellab;
                    console.log('laboratorio eliminado');
                  }, err => {
                    this.toastr.error('Error api delete laboratorio');
                  }
                );
              }
            },
            1000
          );
          setTimeout(
            () => {
              this.tipoService.deleteTipodos(this.parametrito).subscribe(
                resdeltipo => {
                  this.mensaje = resdeltipo;
                  window.location.reload();
                  console.log('tipo eliminado');
                }, err => {
                  this.toastr.error('Error api delete tipo');
                }
              );
            },
            1000
          );
        } else {
          setTimeout(
            () => {
              this.tipoService.deleteTipodos(this.parametrito).subscribe(
                resdeltipo => {
                  this.mensaje = resdeltipo;
                  window.location.reload();
                  console.log('tipo eliminado');
                }, err => {
                  this.toastr.error('Error api delete tipo');
                }
              );
            },
            1000
          );
        }
      }
    } else {
      console.log('Desidio no eliminar tipo');
    }
  }

  deletelab(codigo: any) {
    let numeroanalisis;
    this.parametrito = codigo;
    this.rxtmrmService.getrxtmrmolaboratorio(this.parametrito).subscribe(
      resdelextmrm => {
        this.rxtmrm = resdelextmrm;
        numeroanalisis = Object.entries(this.rxtmrm).length;
        if (numeroanalisis > 0) {
          this.hayrxtmrm = true;
        }
      }, err => {
        this.toastr.error('Error Api get analisis viculados a tipo');
      }
    );
    if (confirm('¿Estas seguro de eliminar laboratorio? - eliminaras tambien la vinculacion con las citas')) {
      console.log(this.rxtmrm);
      if (this.hayrxtmrm === true) {
        setTimeout(
          () => {
            for (const item of this.laboratorios) {
              const parametro = item.id;
              this.rxtmrmService.deleteLaboratoriocita(parametro).subscribe(
                resdellab => {
                  this.mensaje = resdellab;
                  console.log('rxtmrm eliminado');
                }, err => {
                  this.toastr.error('Error api delete rxtmrm');
                }
              );
            }
          },
          1000
        );
        setTimeout(
          () => {
            this.laboratorioService.deleteLaboratorio(this.parametrito).subscribe(
              resdellab => {
                this.mensaje = resdellab;
                window.location.reload();
                console.log('laboratorio eliminado');
              }, err => {
                this.toastr.error('Error api delete laboratorio');
              }
            );
          },
          1000
        );
      } else {
        setTimeout(
          () => {
            this.laboratorioService.deleteLaboratorio(this.parametrito).subscribe(
              resdellab => {
                this.mensaje = resdellab;
                window.location.reload();
                console.log('laboratorio eliminado');
              }, err => {
                this.toastr.error('Error api delete laboratorio');
              }
            );
          },
          1000
        );
      }
    } else {
      console.log('Desidio no eliminar laboratorio');
    }
  }
  agregar(codigo: any) {
    console.log(codigo);
    const codigotipo = codigo;
    this.toastr.info('Agregar nuevo Examen');
    this.router.navigate(
      [
        'admin',
        'rx-tm-rm',
        'add',
        codigotipo
      ]
    );
  }
  cancelar() {
    window.location.reload();
  }

}

