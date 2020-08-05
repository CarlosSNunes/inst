export class TagUpdateModel {
    public constructor(init?: Partial<TagUpdateModel>) {
        Object.assign(this, init);
    }
    id: number;
    descricao: string;
}
