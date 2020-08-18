export class BreadcrumbModel {
    constructor(init?: Partial<BreadcrumbModel>) {
        Object.assign(this, init);
    }

    name: string;
    link: string;
    active?: boolean = false;
}