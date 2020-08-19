export class DropDownItem<T = string> {
    key: string;
    value: T;
    
    constructor(init?: Partial<DropDownItem<T>>) {
        Object.assign(this, init)
    }
}