export class PerguntaTipoModel {
    public constructor(init?: Partial<PerguntaTipoModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
}
