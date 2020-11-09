import { CareplusPerfilCreateModel } from '../careplus-perfil/careplus-perfil-create.model';


export class UsuarioCreateModel {
  public constructor(init?: Partial<UsuarioCreateModel>) {
    Object.assign(this, init);
    this.usuarioPerfil = [];
    init.usuarioPerfil.forEach(user => this.usuarioPerfil.push(new CareplusPerfilCreateModel(user)));
  }
  nome: string;
  email: string;
  senha: string;
  usuarioPerfil: CareplusPerfilCreateModel[];
}
