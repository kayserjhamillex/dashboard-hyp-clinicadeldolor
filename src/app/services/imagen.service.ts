import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  URL = 'https://fileuploadjxdesign.herokuapp.com/upload-images';
  constructor(private http: HttpClient) { }

  uploadimage(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.URL}`, formData);
  }
}

