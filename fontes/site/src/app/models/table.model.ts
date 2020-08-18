import { ButtonModel } from './button.model';

export class TableModel {
    constructor(init?: Partial<TableModel>) {
        Object.assign(this, init)
    }

    headItems: HeadItem[] = [];
    bodyItems: any[] = [];
}

class HeadItem {
    constructor(init?: Partial<HeadItem>) {
        Object.assign(this, init)
    }

    key: string;
    text: string;
}