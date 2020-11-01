import { CareplusPerfilCreateModel } from '../careplus-perfil/careplus-perfil-create.model';


export class UsuarioUpdateModel {
  public constructor(init?: Partial<UsuarioUpdateModel>) {
    Object.assign(this, init);

    this.perfil = [];

    if (init.perfil) {
      init.perfil.forEach(perfil => this.perfil.push(new CareplusPerfilCreateModel(perfil)));
    }
  }
  nome: string;
  email: string;
  dataCadastro: Date;
  SenhaHash: string;
  SenhaSalt: string;
  perfil: CareplusPerfilCreateModel[];
}
