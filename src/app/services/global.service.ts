import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionesGlobalesService {

  getedad(fecha: Date) {
    const FechaActual = new Date();
    const FechaNacimiento = new Date(fecha);
    const dia = FechaNacimiento.getDate();
    const mes = FechaNacimiento.getMonth() + 1;
    const ano = FechaNacimiento.getFullYear();
    // cogemos los valores actuales
    // tslint:disable-next-line: variable-name
    const ahora_ano = FechaActual.getFullYear();
    // tslint:disable-next-line: variable-name
    const ahora_mes = FechaActual.getMonth() + 1;
    // tslint:disable-next-line: variable-name
    const ahora_dia = FechaActual.getDate();
    // realizamos el calculo
    let edad = ahora_ano - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes === ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    // calculamos los meses
    let meses = 0;
    if (ahora_mes > mes && dia > ahora_dia) {
        meses = ahora_mes - mes - 1;
    }
    else if (ahora_mes > mes) {
        meses = ahora_mes - mes;
    }
    if (ahora_mes < mes && dia < ahora_dia) {
        meses = 12 - (mes - ahora_mes);
    }
    else if (ahora_mes < mes) {
        meses = 12 - (mes - ahora_mes + 1);
    }
    if (ahora_mes === mes && dia > ahora_dia) {
        meses = 11;
    }
    // calculamos los dias
    let dias = 0;
    if (ahora_dia > dia) {
        dias = ahora_dia - dia;
    }
    if (ahora_dia < dia) {
        const ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }
    const laedad = edad + ' años, ' + meses + ' meses y ' + dias + ' días';
    return laedad;
  }

  constructor() { }
}
