export class TagModel {
    public constructor(init?: Partial<TagModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
    selected: boolean;
}

export class TagModelList {
    public constructor(init?: Partial<TagModelList>) {
        Object.assign(this, init);
    }

    count: number;
    result: TagModel[] = [];
}

