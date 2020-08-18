import { ButtonModel } from './button.model';

export class PlanCardModel {
    constructor(init?: Partial<PlanCardModel>) {
        Object.assign(this, init);
    }

    title: string = '';
    subTitle: string = '';
    description: string = '';
    button: ButtonModel;
    image: string = '';
    id: string;
}