import { ButtonModel } from './button.model';

export class CareplusVideoModel {
    public constructor(init?: Partial<CareplusVideoModel>) {
        this.htag = 'h5';
        Object.assign(this, init);
    }
    smallTitle?: string;
    bigTitle?: string;
    button: ButtonModel;
    backgroundColor?: string = '#FFF';
    embedSrc: string = '';
    htag: string = 'h5';
}
