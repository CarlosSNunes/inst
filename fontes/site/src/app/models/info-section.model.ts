import { ButtonModel } from './button.model';

export class InfoSectionModel<T = any> {
    public constructor(init?: Partial<InfoSectionModel>) {
        this.objectFit = 'cover';
        this.htag = 'h5';
        Object.assign(this, init);
    }

    smallTitle: string;
    bigTitle: string;
    htag: string = 'h5';
    description: string;
    subDescription: string;
    subDescriptions?: string[] = [];
    /**
     * @property {string} text
     * @property {string} obs
     * @type {Array<Item>}
     */
    items?: Item[] = [];
    button: ButtonModel;
    imageSrc: string;
    reverse?: boolean = false;
    alignCenter?: boolean = false;
    removeLine?: boolean = false;
    objectFit?: string = 'cover';
    hasModal?: boolean = false;
    modalContent: T;
    parallax?: boolean = false;
    mobileImageHeight: string = '208px';
    backgroundColorClass: string = 'white-background-color';
}

class Item {
    constructor(init?: Partial<Item>) {
        Object.assign(this, init)
    }

    text?: string;
    obs?: string;
}