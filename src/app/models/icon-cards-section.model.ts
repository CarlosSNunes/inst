import { ButtonModel } from './button.model';

export class IconCardsSectionModel<T = any> {
    constructor(init?: Partial<IconCardsSectionModel<T>>) {
        this.columnClass = 'is-4-desktop';
        this.cendered = true;
        this.bigTitleMaxWidth = 632;
        Object.assign(this, init)
    }

    cards?: T[] = [];
    smallTitle?: string = '';
    bigTitle?: string = '';
    bigTitleMaxWidth: number = 632;
    description?: string = '';
    subDescription?: string = '';
    button?: ButtonModel;
    cendered?: boolean = true;
    columnClass?: 'is-2-desktop' | 'is-3-desktop' | 'is-4-desktop' = 'is-3-desktop';
}