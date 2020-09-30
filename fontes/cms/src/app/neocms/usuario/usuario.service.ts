import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassHelper } from 'src/utils/class-helper';
import { UsuarioModel } from 'src/models/usuario/usuario.model';
import { UsuarioCreateModel } from 'src/models/usuario/usuario-create.model';
import { UsuarioUpdateModel } from 'src/models/usuario/usuario-update.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'https://localhost:4000/Usuario';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<UsuarioModel[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<UsuarioModel>(this.url + '/' + id);
  }

  post(usuario: UsuarioCreateModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(usuario));
  }

  put(usuario: UsuarioUpdateModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(usuario));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}