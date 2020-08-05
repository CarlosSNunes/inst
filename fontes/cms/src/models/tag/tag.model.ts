export class TagModel {
    public constructor(init?: Partial<TagModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    dataCadastro: Date;
    selected: boolean;
}
