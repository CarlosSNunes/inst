import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from './../../../models/usuario/usuario.model';
import { UsuarioCreateModel } from './../../../models/usuario/usuario-create.model';
import { UsuarioUpdateModel } from './../../../models/usuario/usuario-update.model';
import { LoginModel } from '../../../models/login.model';
import { environment } from 'src/environments/environment';
import { ClassHelper } from 'src/utils/class-helper';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private readonly API_ENDPOINT = environment.API + '/Usuario';
  private classHelper = ClassHelper;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * @method GETALL() - Método retorna todos os usuários cadastrados.
   * @returns UsuarioModel[]
   * @memberOf UsuarioService
   */
  getAll() {
    return this.http.get<UsuarioModel[]>(this.API_ENDPOINT);
  }
  /**
   * @method GETBYID() - Método retorna usuários por id.
   * @param id: string
   * @returns UsuarioModel
   * @memberOf UsuarioService
   */
  getById(id: string) {
    return this.http.get<UsuarioModel>(this.API_ENDPOINT + '/' + id);
  }

  /**
   * @method POST() - Método retorna usuários por id.
   * @param id: string
   * @returns UsuarioModel
   * @memberOf UsuarioService
   */
  post(usuario: UsuarioCreateModel) {
    return this.http.post(this.API_ENDPOINT, usuario);
  }

  /**
   * @method POST() - Método valida se usuario tenm autorização para acessar o sistema.
   * @param id: string
   * @returns UsuarioModel
   * @memberOf UsuarioService
   */
  valida(login: LoginModel) {
    return this.http.post(this.API_ENDPOINT, [login])
      .subscribe(
        result => {
          console.log(result);
        },
        error => console.log(error));
  }

  /**
   * @method PUT() - Método atualizar um usuário.
   * @param id: string
   * @returns UsuarioModel
   * @memberOf UsuarioService
   */
  put(usuario: UsuarioUpdateModel) {
    return this.http.put(this.API_ENDPOINT, usuario);
  }

  /**
   * @method DELETE() - Método deletar um usuário.
   * @param id: string
   * @memberOf UsuarioService
   */
  delete(id: number) {
    return this.http.delete(this.API_ENDPOINT + '/' + id);
  }

}
