export class TagCreateModel {
    public constructor(init?: Partial<TagCreateModel>) {
        Object.assign(this, init);
    }

    descricao: string;
}
