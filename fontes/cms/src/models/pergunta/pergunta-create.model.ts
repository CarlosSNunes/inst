export class PerguntaCreateModel {
    public constructor(init?: Partial<PerguntaCreateModel>) {
        Object.assign(this, init);
    }

    descricao: string;
    resposta: string;
    perguntaTipoId: number;
}
