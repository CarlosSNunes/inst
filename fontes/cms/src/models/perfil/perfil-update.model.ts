import { PerfilModel } from './perfil.model';
export class PerfilUpdateModel {
  public constructor(init?: Partial<PerfilUpdateModel>) {
      Object.assign(this, init);
  }

  id       : number;
  descricao: string;
  perfilId : number;
}
