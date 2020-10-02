import { PerfilModel } from './perfil.model';

export class UserAuthenticateModel {
    public constructor(init?: Partial<UserAuthenticateModel>) {
        Object.assign(this, init);
        this.perfis = [];

        init.perfis.forEach(perfil => this.perfis.push(new PerfilModel(perfil)));
    }

    id: number;
    email: string;
    nome: string;
    token: string;
    perfis: PerfilModel[];
}
