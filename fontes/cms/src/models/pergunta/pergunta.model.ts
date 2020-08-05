import { PerguntaTipoModel } from '../pergunta-tipo/pergunta-tipo.model';

export class PerguntaModel {
    public constructor(init?: Partial<PerguntaModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    resposta: string;
    perguntaTipo: PerguntaTipoModel;
    perguntaTipoId: number;
    dataCadastro: Date;
    usuarioId: number;
}
