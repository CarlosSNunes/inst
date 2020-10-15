import { Injectable } from '@angular/core';
import { CareplusPerfilModel } from './../../../../src/models/careplus-perfil/careplus-perfil.model';
import { HttpClient } from '@angular/common/http';
import { CareplusPerfilCreateModel } from './../../../../src/models/careplus-perfil/careplus-perfil-create.model';
import { CareplusPerfilUpdateModel } from './../../../../src/models/careplus-perfil/careplus-perfil-update.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareplusPerfilService {
  private readonly API_ENDPOINT = environment.API + '/Perfil';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<CareplusPerfilModel[]>(this.API_ENDPOINT);
  }

  getById(id: string) {
    return this.http.get<CareplusPerfilModel>(this.API_ENDPOINT + '/' + id);
  }

  post(careplusPerfil: CareplusPerfilCreateModel) {
    return this.http.post(this.API_ENDPOINT, [careplusPerfil]);
  }

  put(careplusPerfil: CareplusPerfilUpdateModel) {
    return this.http.put(this.API_ENDPOINT, [careplusPerfil]);
  }

  delete(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/' + id);
  }
}
