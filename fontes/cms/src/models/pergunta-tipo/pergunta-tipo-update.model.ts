export class PerguntaTipoUpdateModel {
    public constructor(init?: Partial<PerguntaTipoUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
}
