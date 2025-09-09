import { ToastrService } from 'ngx-toastr';
import { Tipo } from '../../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TipoService } from '../../../services/tipo.service';
import { ItemLaboratorio } from '../../../models/itemlaboratorio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalisisService } from '../../../services/analisis.service';
import { LaboratorioService } from '../../../services/laboratorio.service';
import { ItemLaboratorioService } from '../../../services/itemlaboratorio.service';

@Component({
  selector: 'app-analisis-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './analisis-list.component.html',
  styleUrl: './analisis-list.component.css'
})
export default class AnalisisListComponent implements OnInit {
  analisis: any = [];
  laboratorios: any = [];
  tipos: any = [];
  itemslab: any = [];
  hayanalisis = false;
  haylaboratorios = false;
  bandera = false;
  banderaitem = false;
  tipo: Tipo = {
    id: 0,
    Name: ''
  };
  ElItem: ItemLaboratorio = {
    id: 0,
    Name: '',
    Method: '',
    Measurement: '',
    ReferentialRange: '',
    LaboratorioId: 0
  }
  ElItem1: ItemLaboratorio = {
    id: 0,
    Name: '',
    Method: '',
    Measurement: '',
    ReferentialRange: '',
    LaboratorioId: 0
  }
  codigoitem: any;
  mensaje: any;
  mensaje1: any;
  codigotipo: any;
  parametrito: any;
  mensajeitem: any;
  mensajeanalisis: any;
  mensajelaboratorio: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private tipoService: TipoService,
    private analisisService: AnalisisService,
    private laboratorioService: LaboratorioService,
    private itemlaboratorioService: ItemLaboratorioService
  ) { }
  ngOnInit(): void {
    this.gettipos();
  }
  gettipos() {
    this.tipoService.getTipos().subscribe(
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
        this.toastr.error('Error Api List analisis del Tipo');
      }
    );
  }
  updateTipo() {
    // llamando a laboratorio de creacion que esta enlazada con el api
    this.tipoService.updateTipo(this.codigotipo, this.tipo).subscribe(
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
  saveItem() {
    this.itemlaboratorioService.saveItemLaboratorio(this.ElItem).subscribe(
      resitem => {
        this.ElItem1 = resitem;
        this.toastr.success('Item Creado satisfactoriamente.');
      }, err => {
        this.toastr.error('no se pudo crear otro item');
      }
    );
  }

  updateItem(data: any) {
    this.itemlaboratorioService.updateItemLaboratorio(this.codigoitem, this.ElItem).subscribe(
      resitem => {
        this.mensajeitem = resitem;
        this.toastr.success('Item Actualizado satisfactoriamente.');
        this.banderaitem = false;
      }, err => {
        this.toastr.error('no se pudo actualizar el item');
      }
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'analisis',
        'create'
      ]
    );
  }
  edit(codigo: any) {
    this.bandera = true;
    this.codigotipo = codigo;
    this.tipoService.getTipo(codigo).subscribe(
      res => {
        this.tipo = res;
      }, err => {
        this.toastr.error('Error api tipo get');
      }
    );
  }
  editaritem(codigo: any) {
    this.bandera = true;
    this.codigotipo = codigo;
    this.itemlaboratorioService.getItemLaboratorio(codigo).subscribe(
      res => {
        this.ElItem = res;
        this.banderaitem = true;
      }, err => {
        this.toastr.error('Error api itemlab get');
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
        'analisis',
        'update',
        codigoaeditar
      ]
    );
  }
  delete(codigo: any) {
    let numeroanalisis;
    let numerolaboratorios;
    this.parametrito = codigo;
    this.analisisService.getanalisistipo(this.parametrito).subscribe(
      reslistana => {
        this.analisis = reslistana;
        console.log('analisis relacionados', this.analisis);
        numeroanalisis = Object.entries(this.analisis).length;
        if (numeroanalisis > 0) {
          this.hayanalisis = true;
        }
      }, err => {
        this.toastr.error('Error Api get analisis viculados a tipo');
      }
    );
    this.laboratorioService.getLaboratorioTipo(this.parametrito).subscribe(
      reslistlab => {
        this.laboratorios = reslistlab;
        console.log('laboratorios relacionados', this.laboratorios);
        numerolaboratorios = Object.entries(this.analisis).length;
        if (numerolaboratorios > 0) {
          this.haylaboratorios = true;
        }
      }, err => {
        this.toastr.error('Error Api get laboratorio del Tipo');
      }
    );
    if (confirm('¿Estas seguro de eliminar tipo? - eliminaras tambien la vinculacion con las citas y sus laboratorios')) {
      console.log(this.analisis);
      console.log(this.laboratorios);
      if (this.hayanalisis === true) {
        setTimeout(
          () => {
            console.log('analisis relacionados por borrar', this.analisis);
            for (const item of this.analisis) {
              const parametro = item.id;
              this.analisisService.deleteAnalisis(parametro).subscribe(
                resdelana => {
                  this.mensaje = resdelana;
                  console.log('analisis eliminado');
                }, err => {
                  this.toastr.error('Error api delete analisis');
                }
              );
            }
          },
          1000
        );
        if (this.haylaboratorios === true) {
          setTimeout(
            () => {
              console.log('laboratorios relacionados por borrar', this.laboratorios);
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
              this.tipoService.deleteTipo(this.parametrito).subscribe(
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
              this.tipoService.deleteTipo(this.parametrito).subscribe(
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
              console.log('laboratorios relacionados por borrar', this.laboratorios);
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
              this.tipoService.deleteTipo(this.parametrito).subscribe(
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
              this.tipoService.deleteTipo(this.parametrito).subscribe(
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
  agregar(codigo: any) {
    console.log(codigo);
    const codigotipo = codigo;
    this.toastr.info('Agregar nuevo Examen');
    this.router.navigate(
      [
        'admin',
        'analisis',
        'add',
        codigotipo
      ]
    );
  }
  deletelab(codigo: any) {
    let numeroanalisis;
    this.parametrito = codigo;
    this.analisisService.getanalisislaboratorio(this.parametrito).subscribe(
      reslistana => {
        this.analisis = reslistana;
        console.log('analisis relacionados', this.analisis);
        numeroanalisis = Object.entries(this.analisis).length;
        if (numeroanalisis > 0) {
          this.hayanalisis = true;
        }
      }, err => {
        this.toastr.error('Error Api get analisis viculados a tipo');
      }
    );
    if (confirm('¿Estas seguro de eliminar laboratorio? - eliminaras tambien la vinculacion con las citas')) {
      console.log(this.analisis);
      if (this.hayanalisis === true) {
        setTimeout(
          () => {
            console.log('analisis relacionados por borrar', this.analisis);
            for (const item of this.laboratorios) {
              const parametro = item.id;
              this.analisisService.deleteAnalisis(parametro).subscribe(
                resdellab => {
                  this.mensaje = resdellab;
                  console.log('analisis eliminado');
                }, err => {
                  this.toastr.error('Error api delete analisis');
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
  cancelar() {
    window.location.reload();
  }
}

