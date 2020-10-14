import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassHelper } from './../../../../src/utils/class-helper';
import { UsuarioModel } from './../../../models/usuario/usuario.model';
import { UsuarioCreateModel } from './../../../models/usuario/usuario-create.model';
import { UsuarioUpdateModel } from './../../../models/usuario/usuario-update.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'localhost:8081/Usuario';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @method GETALL() - Método retorna todos os usuários cadastrados.
   * @returns UsuarioModel[]
   * @memberOf UsuarioService
   */
  getAll() {
    return this.http.get<UsuarioModel[]>(this.url);
  }
  /**
   * @method GETBYID() - Método retorna usuários por id.
   * @param id: string
   * @returns UsuarioModel
   * @memberOf UsuarioService
   */
  getById(id: string) {
    return this.http.get<UsuarioModel>(this.url + '/' + id);
  }

  /**
   * @method POST() - Método retorna usuários por id.
   * @param id: string
   * @returns UsuarioModel
   * @memberOf UsuarioService
   */
  post(usuario: UsuarioCreateModel) {
    return this.http.post(this.url, this.classHelper.jsonToFormData(usuario));
  }

  /**
   * @method PUT() - Método atualizar um usuário.
   * @param id: string
   * @returns UsuarioModel
   * @memberOf UsuarioService
   */
  put(usuario: UsuarioUpdateModel) {
    return this.http.put(this.url, this.classHelper.jsonToFormData(usuario));
  }

  /**
   * @method DELETE() - Método deletar um usuário.
   * @param id: string
   * @memberOf UsuarioService
   */
  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}
