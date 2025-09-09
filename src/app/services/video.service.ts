import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoUploadService {
  // URL = 'https://fileuploadjxdesign.herokuapp.com/upload-videos';
  URL = 'https://vicky-uploadfile.herokuapp.com/upload-videos';
  // URL = 'http://localhost:666/upload-images';
  constructor(private http: HttpClient) { }

  uploadvideo(file: File, name: string) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append(name, file, file.name);
    // retornamos la data del servidor
    return this.http.post(`${this.URL}`, formData);
  }
}

interface UploadResponse {
  percent: number;
  data: any;
}
