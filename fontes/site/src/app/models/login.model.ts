export class LoginModel {
    public constructor(init?: Partial<LoginModel>) {
        Object.assign(this, init);
    }

    email: string;
    senha: string;
}


export class UserloginResponse {
    public constructor(init?: Partial<UserloginResponse>) {
        Object.assign(this, init);
    }
    nome: string;
    token: string;
    perfis: {
        descricao: string,
        id: number
    }[];
}
