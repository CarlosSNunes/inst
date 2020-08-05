export class PerguntaUpdateModel {
    public constructor(init?: Partial<PerguntaUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    resposta: string;
    perguntaTipoId: number;
}
