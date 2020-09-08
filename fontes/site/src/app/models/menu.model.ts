export class SubMenu {
    constructor(init?: Partial<SubMenu>) {
        Object.assign(this, init);
    }

    id: string;
    items: SubMenuItem[];
}

export class SubMenuItem {
    constructor(init?: Partial<SubMenuItem>) {
        Object.assign(this, init);
    }

    title: string;
    routerLink: string;
    fragment: string;
    subItems: SubMenuItem[];
}