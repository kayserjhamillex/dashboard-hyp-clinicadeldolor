import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileUploadService {
  urlgeneral = 'https://uploadfile.jxdesignsolution.com';
  // urlgeneral = 'https://fileuploadjxdesign.herokuapp.com';
  URLlogosmall = this.urlgeneral + '/smalllogo';
  URLlogolarge = this.urlgeneral + '/largelogo';
  URLfoto = this.urlgeneral + '/foto';
  urlimagen = this.urlgeneral + '/upload-images';
  urlicono = this.urlgeneral + '/upload-icono';
  urlbannercito = this.urlgeneral + '/banner';
  urlnumero = this.urlgeneral + '/numero';
  urlobjetivo = this.urlgeneral + '/objetivo';
  urlmarca = this.urlgeneral + '/marca';
  urlproducto = this.urlgeneral + '/producto';
  urlservicio = this.urlgeneral + '/servicio';
  urlvalor = this.urlgeneral + '/valor';
  urlqr = this.urlgeneral + '/qr';

  constructor(private http: HttpClient) { }

  uploadimage(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlimagen}`, formData);
  }

  uploadicono(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlicono}`, formData);
  }
  // tslint:disable-next-line: typedef
  uploadfoto(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.URLfoto}`, formData);
  }
  uploadlogosmall(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.URLlogosmall}`, formData);
  }
  uploadlogolarge(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.URLlogolarge}`, formData);
  }
  uploadbanner(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlbannercito}`, formData);
  }
  uploadnumero(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlnumero}`, formData);
  }
  uploadobjetivo(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlobjetivo}`, formData);
  }
  uploadmarca(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlmarca}`, formData);
  }
  uploadproducto(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlproducto}`, formData);
  }
  uploadservicio(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlservicio}`, formData);
  }
  uploadsvalor(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlvalor}`, formData);
  }
  uploadqr(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.urlqr}`, formData);
  }
}
