import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriasUpdateModel } from './../../../../../src/models/categorias/categorias-update.model';
import { CategoriasCreateModel } from './../../../../../src/models/categorias/categorias-create.model';
import { CategoriasModel } from './../../../../../src/models/categorias/categorias.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private url = 'http://52.3.44.106:8081/Categorias';


  constructor(
    private http: HttpClient
    ) { }

    getAll() {
      return this.http.get<CategoriasModel[]>(this.url);
    }

    getById(id: string) {
      return this.http.get<CategoriasModel>(this.url + '/' + id);
    }

    post(banner: CategoriasCreateModel) {
      return this.http.post(this.url, banner);
    }

    put(banner: CategoriasUpdateModel) {
      return this.http.put(this.url, banner);
    }

    delete(id: number) {
      return this.http.delete(this.url + '/' + id);
    }

  }
