export class LoginModel {
    public constructor(init?: Partial<LoginModel>) {
        Object.assign(this, init);
    }

    nomeUsuario: string;
    senha: string;
}
