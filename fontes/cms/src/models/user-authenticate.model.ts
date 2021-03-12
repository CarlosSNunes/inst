import { CareplusPerfilModel } from './../models/careplus-perfil/careplus-perfil.model';

export class UserAuthenticateModel {
    public constructor(init?: Partial<UserAuthenticateModel>) {
        Object.assign(this, init);

        if (init) {
            this.perfis = [];
            init.perfis.forEach(perfil => this.perfis.push(new CareplusPerfilModel(perfil)));
        }
    }

    nome: string;
    token: string;
    perfis: CareplusPerfilModel[];
}
