import { PerfilCreateModel } from '../perfil/perfil-create.model';
import { PerfilModel } from './../perfil/perfil.model';

export class UsuarioModel {
  public constructor(init?: Partial<UsuarioModel>) {
    Object.assign(this, init);
    
    this.perfil = [];        

    if (init.perfil) {
        init.perfil.forEach(perfil => this.perfil.push(new PerfilCreateModel(perfil)));
    }

  }
  id          : number;
  nome        : string;
  email       : string;
  dataCadastro: Date;
  SenhaHash   : string;
  SenhaSalt   : string;
  perfil      : PerfilModel[];
}

