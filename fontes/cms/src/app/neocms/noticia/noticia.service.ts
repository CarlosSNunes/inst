import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NoticiaModel } from 'src/models/noticia/noticia.model';
import { NoticiaCreateModel } from 'src/models/noticia/noticia-create.model';
import { ClassHelper } from 'src/utils/class-helper';
import { Observable } from 'rxjs';
import { NoticiaUpdateModel } from 'src/models/noticia/noticia-update-model';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private url = 'https://localhost:4007/Noticia';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(file: File) {
    return this.http.post(this.url + '/Upload', this.classHelper.jsonToFormData(file));
  }

  deleteImage(fileName: string) {
    return this.http.post(this.url + '/DeleteImage', fileName);
  }

  getAll() {
    return this.http.get<NoticiaModel[]>(this.url);
  }

  getById(id: string): Observable<NoticiaModel> {
    return this.http.get<NoticiaModel>(this.url + '/' + id);
  }

  post(noticia: NoticiaCreateModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(noticia));
  }

  put(noticia: NoticiaUpdateModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(noticia));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
