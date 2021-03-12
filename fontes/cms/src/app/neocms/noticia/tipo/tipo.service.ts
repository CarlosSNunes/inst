import { Injectable } from '@angular/core';
import { ClassHelper } from './../../../../../src/utils/class-helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NoticiaTipoModel } from './../../../../../src/models/noticia-tipo/noticia-tipo.model';
import { NoticiaTipoCreateModel } from './../../../../../src/models/noticia-tipo/noticia-tipo-create.model';
import { NoticiaTipoUpdateModel } from './../../../../../src/models/noticia-tipo/noticia-tipo-update.model';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  url = 'https://localhost:4006/NoticiaTipo';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll(page: number, pageSize: number) {
    return this.http.get<NoticiaTipoModel[]>(this.url + '/' + page + '/' + pageSize);
  }

  getById(id: string) {
    return this.http.get<NoticiaTipoModel>(this.url + '/' + id);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  post(tags: NoticiaTipoCreateModel[]) {
    return this.http.post(this.url, tags);
  }

  put(tags: NoticiaTipoUpdateModel[]) {
    return this.http.put(this.url, tags);
  }
}
