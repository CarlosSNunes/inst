import { CareplusPerfilModel } from './../careplus-perfil/careplus-perfil.model';
export class UsuarioModel {
  public constructor(init?: Partial<UsuarioModel>) {
    Object.assign(this, init);
  }
  id: number;
  nome: string;
  ativo:string;
  nomeUsuario: string;
  SenhaHash: string;
  SenhaSalt: string;
  usuarioPerfil: any;
}

