export class DropDownItem<T = string> {
    title: string;
    value: T;

    constructor(init?: Partial<DropDownItem<T>>) {
        Object.assign(this, init)
    }
}
