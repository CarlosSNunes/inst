export class ButtonModel {
    public constructor(init?: Partial<ButtonModel>) {
        if (!this.routerLink) {
            this.target = '_blank'
        } else {
            this.target = '_self'
        }
        Object.assign(this, init);
    }

    text: string;
    title?: string;
    link?: string;
    routerLink?: string;
    class: string = 'btn-digital-cian secondary';
    touchClass: string = 'btn-digital-cian tertiary arrow-right'
    target: string;
    queryParams: { [key: string]: any }
    action?: Function;
    fragment: string;
}
