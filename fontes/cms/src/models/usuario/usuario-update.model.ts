import { CareplusPerfilCreateModel } from '../careplus-perfil/careplus-perfil-create.model';


export class UsuarioUpdateModel {
  public constructor(init?: Partial<UsuarioUpdateModel>) {
    Object.assign(this, init);

    this.usuarioPerfil = [];

    if (init.usuarioPerfil) {
      init.usuarioPerfil.forEach(perfil => this.usuarioPerfil.push(new CareplusPerfilCreateModel(perfil)));
    }
  }
  id: string;
  nome: string;
  nomeUsuario: string;
  dataCadastro: Date;
  SenhaHash: string;
  SenhaSalt: string;
  usuarioPerfil: CareplusPerfilCreateModel[];
}
