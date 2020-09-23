import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassHelper } from 'src/utils/class-helper';
import { UsuarioModel } from 'src/models/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'http://52.3.44.106:8081/Usuario';
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

  post(usuario: UsuarioModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(usuario));
  }

  put(usuario: UsuarioModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(usuario));
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
