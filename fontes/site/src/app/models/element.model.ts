export class ElementModel {
    public constructor(init?: Partial<ElementModel>) {
        Object.assign(this, init);
    }

    name: string;
    id: string;
}
