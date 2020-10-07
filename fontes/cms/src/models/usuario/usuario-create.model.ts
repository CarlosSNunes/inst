import { PerfilCreateModel } from '../perfil/perfil-create.model';

export class UsuarioCreateModel {
  public constructor(init?: Partial<UsuarioCreateModel>) {
    Object.assign(this, init);
  }
  nome        : string;
  email       : string;
  dataCadastro: Date;
  SenhaHash   : string;
  SenhaSalt   : string;
  perfil      : PerfilCreateModel[];
}