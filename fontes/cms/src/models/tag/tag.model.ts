export class TagModel {
    public constructor(init?: Partial<TagModel>) {
        Object.assign(this, init);
    }
    count: number;
    result: {
        id: number;
        descricao: string;
        dataCadastro: Date;
        usuarioId: number;
        selected: boolean;
    }
}

