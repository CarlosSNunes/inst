export class ButtonModel {
    public constructor(init?: Partial<ButtonModel>) {
        this.target = '_blank'
        Object.assign(this, init);
    }

    text: string;
    title?: string;
    link?: string;
    routerLink?: string;
    class: string = 'btn-primary';
    target: string;
    queryParams: { [key: string]: any }
    action?: Function;
}
