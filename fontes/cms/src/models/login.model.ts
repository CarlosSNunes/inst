export class LoginModel {
    public constructor(init?: Partial<LoginModel>) {
        Object.assign(this, init);
    }

    email: string;
    senha: string;
}
