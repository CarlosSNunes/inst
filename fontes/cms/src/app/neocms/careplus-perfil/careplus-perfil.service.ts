import { Injectable } from '@angular/core';
import { CareplusPerfilModel } from './../../../../src/models/careplus-perfil/careplus-perfil.model';
import { HttpClient } from '@angular/common/http';
import { CareplusPerfilCreateModel } from './../../../../src/models/careplus-perfil/careplus-perfil-create.model';
import { CareplusPerfilUpdateModel } from './../../../../src/models/careplus-perfil/careplus-perfil-update.model';

@Injectable({
  providedIn: 'root'
})
export class CareplusPerfilService {
  private url = 'http://localhost:8081/Perfil';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<CareplusPerfilModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<CareplusPerfilModel>(this.url + '/' + id);
  }

  post(careplusPerfil: CareplusPerfilCreateModel) {
    return this.http.post(this.url, [careplusPerfil]);
  }

  put(careplusPerfil: CareplusPerfilUpdateModel) {
    return this.http.put(this.url, [careplusPerfil]);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
