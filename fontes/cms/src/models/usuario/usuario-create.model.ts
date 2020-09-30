import { PerfilCreateModel } from '../perfil/perfil-create.model';
import { PerfilModel } from './../perfil/perfil.model';

export class UsuarioCreateModel {
  public constructor(init?: Partial<UsuarioCreateModel>) {
    Object.assign(this, init);

    this.perfil = [];

    if (init.perfil) {
      init.perfil.forEach(perfil => this.perfil.push(new PerfilCreateModel(perfil)));
    }
  }
  nome        : string;
  email       : string;
  dataCadastro: Date;
  SenhaHash   : string;
  SenhaSalt   : string;
  perfil      : PerfilModel[];
}