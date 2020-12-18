import { CareplusPerfilCreateModel } from '../careplus-perfil/careplus-perfil-create.model';


export class UsuarioCreateModel {
    public constructor(init?: Partial<UsuarioCreateModel>) {
        Object.assign(this, init);
        this.usuarioPerfil = [];
        if (init.usuarioPerfil) {
            init.usuarioPerfil.forEach(user => this.usuarioPerfil.push(new CareplusPerfilCreateModel(user)));
        }
    }
    nome: string;
    nomeUsuario: string;
    senha: string;
    usuarioPerfil: CareplusPerfilCreateModel[];
}
