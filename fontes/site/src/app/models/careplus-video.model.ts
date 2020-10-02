import { ButtonModel } from './button.model';

export class CareplusVideoModel {
    public constructor(init?: Partial<CareplusVideoModel>) {
        Object.assign(this, init);
    }
    smallTitle?: string;
    bigTitle?: string;
    button: ButtonModel;
    backgroundColor?: string = '#FFF';
    embedSrc: string = '';
}
