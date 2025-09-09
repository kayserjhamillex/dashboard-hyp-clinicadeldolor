import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IconoUploadService {
  // URL = 'https://fileuploadjxdesign.herokuapp.com/upload-icono';
  URL = 'https://vicky-uploadfile.herokuapp.com/upload-icono';
  // URL = 'http://localhost:666/upload-icono';
  constructor(private http: HttpClient) { }

  uploadicono(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.URL}`, formData);
  }


}

