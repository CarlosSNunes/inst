export class DropDownItem {
    key: string;
    value: string;
    
    constructor(init?: Partial<DropDownItem>) {
        Object.assign(this, init)
    }
}