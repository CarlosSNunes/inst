export class PerguntaTipoCreateModel {
    public constructor(init?: Partial<PerguntaTipoCreateModel>) {
        Object.assign(this, init);
    }

    descricao: string;
}
