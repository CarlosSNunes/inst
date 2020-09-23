export class UsuarioModel {
    public constructor(init?: Partial<UsuarioModel>) {
        Object.assign(this, init);
    }

    id: number;
    nome: string;
    email: string;
    usuarioPerfil: string[];
    ultimoLogin: Date;
}