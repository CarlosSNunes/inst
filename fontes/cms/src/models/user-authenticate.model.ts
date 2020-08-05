import { PerfilModel } from './perfil.model';

export class UserAuthenticateModel {
    public constructor(init?: Partial<UserAuthenticateModel>) {
        Object.assign(this, init);

        if (init) {
            this.perfis = [];
            init.perfis.forEach(perfil => this.perfis.push(new PerfilModel(perfil)));
        }
    }

    nome: string;
    token: string;
    perfis: PerfilModel[];
}
