import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../services/cita.service';
import { DoctorService } from '../../../services/doctor.service';
import { HorarioService } from '../../../services/horario.service';
import { AnalisisService } from '../../../services/analisis.service';
import { ExamencitaService } from '../../../services/examencita.service';
import { DuracioncitaService } from '../../../services/duracioncita.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { EspecialistaService } from '../../../services/especialista.service';
import { FrecuenciacitaService } from '../../../services/frecuenciacita.service';
import { DetallecitacitaService } from '../../../services/detallecitacita.service';
import { DermatomafrontalService } from '../../../services/dermatomafrontal.service';
import { AntpatologicocitaService } from '../../../services/antpatologicocita.service';
import { DermatomaposteriorService } from '../../../services/dermatomaposterior.service';
import { LaboratoriodoscitaService } from '../../../services/laboratoriodoscita.service';
import { AntnopatologicocitaService } from '../../../services/antnopatologicocita.service';
import { AntheredofamiliarcitaService } from '../../../services/antheredofamiliarcita.service';

@Component({
  selector: 'app-especialista-list',
  standalone: true,
  imports: [],
  templateUrl: './especialista-list.component.html',
  styleUrl: './especialista-list.component.css'
})
export default class EspecialistaListComponent implements OnInit {
  especialistas: any = [];
  listaespecialidad: any = [];
  doctores: any = [];
  bandera = false;
  codigodoctor = 0;
  especialidades: any = [];
  horarios: any = [];
  citas: any = [];
  analisis: any = [];
  laboratorios: any = [];
  detallecitas: any = [];
  dermas1: any = [];
  dermas2: any = [];
  ants1: any = [];
  ants2: any = [];
  ants3: any = [];
  examenes: any = [];
  duraciones: any = [];
  frecuencias: any = [];
  hayespecialistas = false;
  hayhorarios = false;
  haycitas = false;
  hayanalisis = false;
  haylaboratorios = false;
  haydetallecitas = false;
  haydermas1 = false;
  haydermas2 = false;
  hayants1 = false;
  hayants2 = false;
  hayants3 = false;
  hayexamenes = false;
  hayduraciones = false;
  hayfrecuencias = false;
  banderadolor = false;
  codigoelegidoctor: any;
  codigoelegidoespecialidad: any;
  mensaje: any;
  vista = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private reservaService: CitaService,
    private doctorService: DoctorService,
    private horarioService: HorarioService,
    private analisisService: AnalisisService,
    private examencitaService: ExamencitaService,
    private especialistaService: EspecialistaService,
    private duracioncitaService: DuracioncitaService,
    private especialidadService: EspecialidadService,
    private ant3citaService: AntpatologicocitaService,
    private detallecitaService: DetallecitacitaService,
    private ant2citaService: AntnopatologicocitaService,
    private frecuenciacitaService: FrecuenciacitaService,
    private laboratorioService: LaboratoriodoscitaService,
    private ant1citaService: AntheredofamiliarcitaService,
    private dermatomafrontalService: DermatomafrontalService,
    private dermatomaposteriorService: DermatomaposteriorService,
  ) { }
  verotro(parametro: boolean) {
    this.vista = parametro;
  }
  ngOnInit(): void {
    this.getdoctores();
    this.getespecialidades();
  }
  ver(codigo: any) {
    this.codigodoctor = codigo;
    this.especialistaService.getEspecialistaFilterDoctor(codigo).subscribe(
      res => {
        this.especialistas = res;
        this.toastr.success('Especialidades del Doctor');
      }, err => {
        this.toastr.error('Error en la Api');
      }
    );
  }
  getdoctores() {
    this.doctorService.getDoctors().subscribe(
      res => {
        this.doctores = res;
        console.log(res);
        this.toastr.success('Doctores');
      }, err => {
        this.toastr.error('Error get doctores');
      }
    );
  }
  getespecialidades() {
    this.especialidadService.getEspecialidads().subscribe(
      res => {
        this.listaespecialidad = res;
        console.log(this.listaespecialidad);
        // this.toastr.success('Error get Especialidades');

      }, err => {
        this.toastr.error('Error api get especialidades');
      }
    );
  }
  // tslint:disable-next-line: typedef
  crear() {
    this.router.navigate(
      [
        'admin',
        'especialista',
        'create'
      ]
    );
  }
  add(codigo: any) {
    console.log(codigo);
    const codigoadd = codigo;
    this.toastr.info('Agregar nueva especialidad');
    this.router.navigate(
      [
        'admin',
        'especialista',
        'add',
        codigoadd
      ]
    );
  }
  // tslint:disable-next-line: typedef
  editar(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Especialista');
    this.router.navigate(
      [
        'admin',
        'especialista',
        'update',
        codigoaeditar
      ]
    );
  }
  editardoctor(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Doctor');
    this.router.navigate(
      [
        'admin',
        'especialista',
        'doctor-edit',
        codigoaeditar
      ]
    );
  }
  editarespecialidad(codigo: any) {
    console.log(codigo);
    const codigoaeditar = codigo;
    this.toastr.info('Editar Doctor');
    this.router.navigate(
      [
        'admin',
        'especialista',
        'especialidad-edit',
        codigoaeditar
      ]
    );
  }
  getdatadoctor(codigo: any) {
    this.codigoelegidoctor = codigo;
    let numeroespecialista;
    let numerohorarios;
    let numerocitas;
    let numeroanalisis: any;
    let numerolaboratorios;
    let numerodetalles;
    let numerodermas1;
    let numerodermas2;
    let numeroexamens;
    let numeroduracions;
    let numerofrecuencias;
    let numeroantecedentes1;
    let numeroantecedentes2;
    let numeroantecedentes3;
    this.especialistaService.getEspecialistaFilterDoctor(codigo).subscribe(
      res => {
        this.especialidades = res;
        numeroespecialista = Object.entries(this.especialidades).length;
        if (numeroanalisis > 0) {
          this.hayespecialistas = true;
        }
      }, err => {
        this.toastr.error('Error api get especialista');
      }
    );
    this.horarioService.gethorariodoctor(codigo).subscribe(
      res => {
        this.horarios = res;
        numerohorarios = Object.entries(this.horarios).length;
        if (numerohorarios > 0) {
          this.hayhorarios = true;
        }
      }, err => {
        this.toastr.error('Error api get horario');
      }
    );
    this.reservaService.getcitadoctor(codigo).subscribe(
      rescitas => {
        this.citas = rescitas;
        numerocitas = Object.entries(this.citas).length;
        const array: any = this.citas;
        console.log(array);
        const parametrito = 'medicina del dolor';
        if (numerocitas > 0) {
          this.haycitas = true;
          for (const item of array) {
            const parametro = item.Type;
            if (parametrito === parametro) {
              this.banderadolor = true;
            }
          }
          this.analisisService.getanalisisdoctor(codigo).subscribe(
            reslistanalisis => {
              this.analisis = reslistanalisis;
              numeroanalisis = Object.entries(this.analisis).length;
              if (numeroanalisis > 0) {
                this.hayanalisis = true;
              }
            }, err => {
              this.toastr.error('Error Api get analisis doctor');
            }
          );
          this.laboratorioService.getrxtmrmdoctor(codigo).subscribe(
            reslistlaboratorio => {
              this.laboratorios = reslistlaboratorio;
              numerolaboratorios = Object.entries(this.laboratorios).length;
              if (numerolaboratorios > 0) {
                this.haylaboratorios = true;
              }
            }, err => {
              this.toastr.error('Error Api get laboratorio doctor');
            }
          );
          if (this.banderadolor === true) {
            this.detallecitaService.getdetalledoctor(codigo).subscribe(
              resdetallecita => {
                this.detallecitas = resdetallecita;
                numerodetalles = Object.entries(this.detallecitas).length;
                if (numerodetalles > 0) {
                  this.haydetallecitas = true;
                }
              }, err => {
                this.toastr.error('Error Api get detalle cita doctor');
              }
            );
            this.dermatomafrontalService.getDermatomafrontaldoctor(codigo).subscribe(
              resderma1cita => {
                this.dermas1 = resderma1cita;
                numerodermas1 = Object.entries(this.dermas1).length;
                if (numerodermas1 > 0) {
                  this.haydermas1 = true;
                }
              }, err => {
                this.toastr.error('Error Api get derma frontal doctor');
              }
            );
            this.dermatomaposteriorService.getDermatomaposteriordoctor(codigo).subscribe(
              resderma2cita => {
                this.dermas2 = resderma2cita;
                numerodermas2 = Object.entries(this.dermas2).length;
                if (numerodermas2 > 0) {
                  this.haydermas2 = true;
                }
              }, err => {
                this.toastr.error('Error Api get derma posterior doctor');
              }
            );
            this.examencitaService.getexamendoctor(codigo).subscribe(
              resexacita => {
                this.examenes = resexacita;
                numeroexamens = Object.entries(this.examenes).length;
                if (numeroexamens > 0) {
                  this.hayexamenes = true;
                }
              }, err => {
                this.toastr.error('Error Api get examen doctor');
              }
            );
            this.duracioncitaService.getDuraciondoctor(codigo).subscribe(
              resduracita => {
                this.duraciones = resduracita;
                numeroduracions = Object.entries(this.duraciones).length;
                if (numeroduracions > 0) {
                  this.hayduraciones = true;
                }
              }, err => {
                this.toastr.error('Error Api get duraciones doctor');
              }
            );
            this.frecuenciacitaService.getFrecuenciadoctor(codigo).subscribe(
              resfrecita => {
                this.frecuencias = resfrecita;
                numerofrecuencias = Object.entries(this.frecuencias).length;
                if (numerofrecuencias > 0) {
                  this.hayfrecuencias = true;
                }
              }, err => {
                this.toastr.error('Error Api get frecuencias doctor');
              }
            );
            this.ant1citaService.getAntHeredoFamiliardoctor(codigo).subscribe(
              resant1cita => {
                this.ants1 = resant1cita;
                numeroantecedentes1 = Object.entries(this.ants1).length;
                if (numeroantecedentes1 > 0) {
                  this.hayants1 = true;
                }
              }, err => {
                this.toastr.error('Error Api get antecendente1 doctor');
              }
            );
            this.ant2citaService.getAntNoPatologicodoctor(codigo).subscribe(
              resant2cita => {
                this.ants2 = resant2cita;
                numeroantecedentes2 = Object.entries(this.ants2).length;
                if (numeroantecedentes2 > 0) {
                  this.hayants2 = true;
                }
              }, err => {
                this.toastr.error('Error Api get antecendente2 doctor');
              }
            );
            this.ant3citaService.getAntPatologicodoctor(codigo).subscribe(
              resant3cita => {
                this.ants3 = resant3cita;
                numeroantecedentes3 = Object.entries(this.ants3).length;
                if (numeroantecedentes3 > 0) {
                  this.hayants3 = true;
                }
              }, err => {
                this.toastr.error('Error Api get antecendente3 doctor');
              }
            );
          }
        }
      }, err => {
        this.toastr.error('Error Api citas doctor');
      }
    );
  }
  getdataespecialidad(codigo: any) {
    this.codigoelegidoespecialidad = codigo;
    let numeroespecialista;
    let numerohorarios;
    let numerocitas;
    let numeroanalisis: any;
    let numerolaboratorios;
    this.especialistaService.getEspecialistaFilterDoctor(codigo).subscribe(
      res => {
        this.especialidades = res;
        numeroespecialista = Object.entries(this.especialidades).length;
        if (numeroanalisis > 0) {
          this.hayespecialistas = true;
        }
      }, err => {
        this.toastr.error('Error api get especialista especialidad');
      }
    );
    this.horarioService.gethorarioespecialidad(codigo).subscribe(
      res => {
        this.horarios = res;
        numerohorarios = Object.entries(this.horarios).length;
        if (numerohorarios > 0) {
          this.hayhorarios = true;
        }
      }, err => {
        this.toastr.error('Error api get horario especialidad');
      }
    );
    this.reservaService.getcitaespecialidad(codigo).subscribe(
      rescitas => {
        this.citas = rescitas;
        numerocitas = Object.entries(this.citas).length;
        const array: any = this.citas;
        console.log(array);
        if (numerocitas > 0) {
          this.haycitas = true;
          this.analisisService.getanalisisespecialidad(codigo).subscribe(
            reslistanalisis => {
              this.analisis = reslistanalisis;
              numeroanalisis = Object.entries(this.analisis).length;
              if (numeroanalisis > 0) {
                this.hayanalisis = true;
              }
            }, err => {
              this.toastr.error('Error Api get analisis especialidad');
            }
          );
          this.laboratorioService.getrxtmrmespecialidad(codigo).subscribe(
            reslistlaboratorio => {
              this.laboratorios = reslistlaboratorio;
              numerolaboratorios = Object.entries(this.laboratorios).length;
              if (numerolaboratorios > 0) {
                this.haylaboratorios = true;
              }
            }, err => {
              this.toastr.error('Error Api get laboratorio especialidad');
            }
          );
        }
      }, err => {
        this.toastr.error('Error Api citas especialidad');
      }
    );
  }
  deletedoctor(codigo: any) {
    console.log('Desidio eliminar doctor');
    if (this.haycitas === true) {
      if (this.banderadolor === true) {
        if (this.hayants1 === true) {
          setTimeout(
            () => {
              for (const item of this.ants1) {
                const parametrodoc = item.id;
                this.ant1citaService.deleteAntHeredoFamiliarCita(parametrodoc).subscribe(
                  resdelant1cita => {
                    this.mensaje = resdelant1cita;
                    console.log('antecedente 1 eliminado');
                  }, err => {
                    this.toastr.error('Error api delete antecendete1 cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.hayants2 === true) {
          setTimeout(
            () => {
              for (const item of this.ants2) {
                const parametrodoc = item.id;
                this.ant2citaService.deleteAntNoPatologicoCita(parametrodoc).subscribe(
                  resdelant2cita => {
                    this.mensaje = resdelant2cita;
                    console.log('antecedente 2 eliminado');
                  }, err => {
                    this.toastr.error('Error api delete antecendete2 cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.hayants3 === true) {
          setTimeout(
            () => {
              for (const item of this.ants3) {
                const parametrodoc = item.id;
                this.ant3citaService.deleteAntPatologicoCita(parametrodoc).subscribe(
                  resdelant3cita => {
                    this.mensaje = resdelant3cita;
                    console.log('antecedente 3 eliminado');
                  }, err => {
                    this.toastr.error('Error api delete antecendete3 cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.hayduraciones === true) {
          setTimeout(
            () => {
              for (const item of this.duraciones) {
                const parametrodoc = item.id;
                this.duracioncitaService.deleteDuracionCita(parametrodoc).subscribe(
                  resdeldurcita => {
                    this.mensaje = resdeldurcita;
                    console.log('duracion cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete duracion cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.hayfrecuencias === true) {
          setTimeout(
            () => {
              for (const item of this.frecuencias) {
                const parametrodoc = item.id;
                this.frecuenciacitaService.deleteFrecuenciaCita(parametrodoc).subscribe(
                  resdelfrecita => {
                    this.mensaje = resdelfrecita;
                    console.log('frecuencia cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete frecuencia cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.haydetallecitas === true) {
          setTimeout(
            () => {
              for (const item of this.detallecitas) {
                const parametrodoc = item.id;
                this.detallecitaService.deleteDetalleCita(parametrodoc).subscribe(
                  resdeldetcita => {
                    this.mensaje = resdeldetcita;
                    console.log('detalle cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete detalle cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.hayexamenes === true) {
          setTimeout(
            () => {
              for (const item of this.examenes) {
                const parametrodoc = item.id;
                this.examencitaService.deleteExamenCita(parametrodoc).subscribe(
                  resdelexacita => {
                    this.mensaje = resdelexacita;
                    console.log('examen cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete examen cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.haydermas1 === true) {
          setTimeout(
            () => {
              for (const item of this.dermas1) {
                const parametrodoc = item.id;
                this.dermatomafrontalService.deleteDermatomafrontal(parametrodoc).subscribe(
                  resdelderma1cita => {
                    this.mensaje = resdelderma1cita;
                    console.log('dermatoma frontal cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete dermatoma frontal cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.haydermas2 === true) {
          setTimeout(
            () => {
              for (const item of this.dermas2) {
                const parametrodoc = item.id;
                this.dermatomaposteriorService.deleteDermatomaposterior(parametrodoc).subscribe(
                  resdelderma2cita => {
                    this.mensaje = resdelderma2cita;
                    console.log('dermatoma posterior cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete dermatoma posterior cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.hayanalisis === true) {
          setTimeout(
            () => {
              for (const item of this.analisis) {
                const parametrodoc = item.id;
                this.analisisService.deleteAnalisis(parametrodoc).subscribe(
                  resdelanacita => {
                    this.mensaje = resdelanacita;
                    console.log('analisis cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete analisis cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.haylaboratorios === true) {
          setTimeout(
            () => {
              for (const item of this.laboratorios) {
                const parametrodoc = item.id;
                this.laboratorioService.deleteLaboratoriocita(parametrodoc).subscribe(
                  resdellabcita => {
                    this.mensaje = resdellabcita;
                    console.log('laboratorio cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete laboratorio cita');
                  }
                );
              }
            },
            1000
          );
        }
        setTimeout(
          () => {
            for (const item of this.citas) {
              const parametrodoc = item.id;
              this.reservaService.deleteCita(parametrodoc).subscribe(
                resdelcita => {
                  this.mensaje = resdelcita;
                  console.log('cita eliminada');
                }, err => {
                  this.toastr.error('Error api delete cita');
                }
              );
            }
          },
          1000
        );
        if (this.hayhorarios === true) {
          setTimeout(
            () => {
              for (const item of this.horarios) {
                const parametrodoc = item.id;
                this.horarioService.deleteHorario(parametrodoc).subscribe(
                  resdelcita => {
                    this.mensaje = resdelcita;
                    console.log('horario eliminada');
                  }, err => {
                    this.toastr.error('Error api delete horario');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.hayespecialistas === true) {
          setTimeout(
            () => {
              for (const item of this.especialidades) {
                const parametrodoc = item.id;
                this.especialistaService.deleteEspecialista(parametrodoc).subscribe(
                  resdelcita => {
                    this.mensaje = resdelcita;
                    console.log('especialista eliminada');
                  }, err => {
                    this.toastr.error('Error api delete especialista');
                  }
                );
              }
            },
            1000
          );
        }
        setTimeout(
          () => {
            this.doctorService.deleteDoctor(codigo).subscribe(
              res => {
                this.mensaje = res;
                this.toastr.info('doctor y sus citas registradas elimiadas');
                window.location.reload();
              }, err => {
                this.toastr.error('Error Api eliminacion de doctor');
              }
            );
          },
          1000
        );
      } else {
        if (this.hayanalisis === true) {
          setTimeout(
            () => {
              for (const item of this.analisis) {
                const parametrodoc = item.id;
                this.analisisService.deleteAnalisis(parametrodoc).subscribe(
                  resdelanacita => {
                    this.mensaje = resdelanacita;
                    console.log('analisis cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete analisis cita');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.haylaboratorios === true) {
          setTimeout(
            () => {
              for (const item of this.laboratorios) {
                const parametrodoc = item.id;
                this.laboratorioService.deleteLaboratoriocita(parametrodoc).subscribe(
                  resdellabcita => {
                    this.mensaje = resdellabcita;
                    console.log('laboratorio cita eliminada');
                  }, err => {
                    this.toastr.error('Error api delete laboratorio cita');
                  }
                );
              }
            },
            1000
          );
        }
        setTimeout(
          () => {
            for (const item of this.citas) {
              const parametrodoc = item.id;
              this.reservaService.deleteCita(parametrodoc).subscribe(
                resdelcita => {
                  this.mensaje = resdelcita;
                  console.log('cita eliminada');
                }, err => {
                  this.toastr.error('Error api delete cita');
                }
              );
            }
          },
          1000
        );
        if (this.hayhorarios === true) {
          setTimeout(
            () => {
              for (const item of this.horarios) {
                const parametrodoc = item.id;
                this.horarioService.deleteHorario(parametrodoc).subscribe(
                  resdelcita => {
                    this.mensaje = resdelcita;
                    console.log('horario eliminada');
                  }, err => {
                    this.toastr.error('Error api delete horario');
                  }
                );
              }
            },
            1000
          );
        }
        if (this.hayespecialistas === true) {
          setTimeout(
            () => {
              for (const item of this.especialidades) {
                const parametrodoc = item.id;
                this.especialistaService.deleteEspecialista(parametrodoc).subscribe(
                  resdelcita => {
                    this.mensaje = resdelcita;
                    console.log('especialista eliminada');
                  }, err => {
                    this.toastr.error('Error api delete especialista');
                  }
                );
              }
            },
            1000
          );
        }
        setTimeout(
          () => {
            this.doctorService.deleteDoctor(codigo).subscribe(
              res => {
                this.mensaje = res;
                this.toastr.info('doctor y sus citas registradas elimiadas');
                window.location.reload();
              }, err => {
                this.toastr.error('Error Api eliminacion de doctor');
              }
            );
          },
          1000
        );
      }
    } else {
      if (this.hayhorarios === true) {
        setTimeout(
          () => {
            for (const item of this.horarios) {
              const parametrodoc = item.id;
              this.horarioService.deleteHorario(parametrodoc).subscribe(
                resdelcita => {
                  this.mensaje = resdelcita;
                  console.log('horario eliminada');
                }, err => {
                  this.toastr.error('Error api delete horario');
                }
              );
            }
          },
          1000
        );
      }
      if (this.hayespecialistas === true) {
        setTimeout(
          () => {
            for (const item of this.especialidades) {
              const parametrodoc = item.id;
              this.especialistaService.deleteEspecialista(parametrodoc).subscribe(
                resdelcita => {
                  this.mensaje = resdelcita;
                  console.log('especialista eliminada');
                }, err => {
                  this.toastr.error('Error api delete especialista');
                }
              );
            }
          },
          1000
        );
      }
      this.doctorService.deleteDoctor(codigo).subscribe(
        res => {
          this.mensaje = res;
          this.toastr.info('doctor y sus citas registradas elimiadas');
          window.location.reload();
        }, err => {
          this.toastr.error('Error Api eliminacion de doctor');
        }
      );
    }
  }
  deleteespecialidad(codigo: any) {
    console.log('Desidio eliminar doctor');
    if (this.haycitas === true) {
      if (this.hayanalisis === true) {
        setTimeout(
          () => {
            for (const item of this.analisis) {
              const parametroesp = item.id;
              this.analisisService.deleteAnalisis(parametroesp).subscribe(
                resdelanacita => {
                  this.mensaje = resdelanacita;
                  console.log('analisis cita eliminada');
                }, err => {
                  this.toastr.error('Error api delete analisis cita');
                }
              );
            }
          },
          1000
        );
      }
      if (this.haylaboratorios === true) {
        setTimeout(
          () => {
            for (const item of this.laboratorios) {
              const parametroesp = item.id;
              this.laboratorioService.deleteLaboratoriocita(parametroesp).subscribe(
                resdellabcita => {
                  this.mensaje = resdellabcita;
                  console.log('laboratorio cita eliminada');
                }, err => {
                  this.toastr.error('Error api delete laboratorio cita');
                }
              );
            }
          },
          1000
        );
      }
      setTimeout(
        () => {
          for (const item of this.citas) {
            const parametroesp = item.id;
            this.reservaService.deleteCita(parametroesp).subscribe(
              resdelcita => {
                this.mensaje = resdelcita;
                console.log('cita eliminada');
              }, err => {
                this.toastr.error('Error api delete cita');
              }
            );
          }
        },
        1000
      );
      if (this.hayhorarios === true) {
        setTimeout(
          () => {
            for (const item of this.horarios) {
              const parametroesp = item.id;
              this.horarioService.deleteHorario(parametroesp).subscribe(
                resdelcita => {
                  this.mensaje = resdelcita;
                  console.log('horario eliminada');
                }, err => {
                  this.toastr.error('Error api delete horario');
                }
              );
            }
          },
          1000
        );
      }
      if (this.hayespecialistas === true) {
        setTimeout(
          () => {
            for (const item of this.especialidades) {
              const parametroesp = item.id;
              this.especialistaService.deleteEspecialista(parametroesp).subscribe(
                resdelcita => {
                  this.mensaje = resdelcita;
                  console.log('especialista eliminada');
                }, err => {
                  this.toastr.error('Error api delete especialista');
                }
              );
            }
          },
          1000
        );
      }
      setTimeout(
        () => {
          this.especialidadService.deleteEspecialidad(codigo).subscribe(
            res => {
              this.mensaje = res;
              this.toastr.info('especialidad y sus citas registradas elimiadas');
              window.location.reload();
            }, err => {
              this.toastr.error('Error Api eliminacion de especialidad');
            }
          );
        },
        1000
      );
    } else {
      if (this.hayhorarios === true) {
        setTimeout(
          () => {
            for (const item of this.horarios) {
              const parametroesp = item.id;
              this.horarioService.deleteHorario(parametroesp).subscribe(
                resdelcita => {
                  this.mensaje = resdelcita;
                  console.log('horario eliminada');
                }, err => {
                  this.toastr.error('Error api delete horario');
                }
              );
            }
          },
          1000
        );
      }
      if (this.hayespecialistas === true) {
        setTimeout(
          () => {
            for (const item of this.especialidades) {
              const parametroesp = item.id;
              this.especialistaService.deleteEspecialista(parametroesp).subscribe(
                resdelcita => {
                  this.mensaje = resdelcita;
                  console.log('especialista eliminada');
                }, err => {
                  this.toastr.error('Error api delete especialista');
                }
              );
            }
          },
          1000
        );
      }
      setTimeout(
        () => {
          this.especialidadService.deleteEspecialidad(codigo).subscribe(
            res => {
              this.mensaje = res;
              this.toastr.info('especialidad y sus citas registradas elimiadas');
              window.location.reload();
            }, err => {
              this.toastr.error('Error Api eliminacion de especialidad');
            }
          );
        },
        1000
      );
    }
  }
}

