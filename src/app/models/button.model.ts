export class ButtonModel {
    public constructor(init?: Partial<ButtonModel>) {
        Object.assign(this, init);
    }

    text: string;
    title?: string;
    link?: string;
    routerLink?: string;
    action?: Function;
}
