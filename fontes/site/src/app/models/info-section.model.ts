import { ButtonModel } from './button.model';

export class InfoSectionModel {
    public constructor(init?: Partial<InfoSectionModel>) {
        this.objectFit = 'cover';
        Object.assign(this, init);
    }

    smallTitle: string;
    bigTitle: string;
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
    parallax?: boolean = false;
    backgroundColorClass: string = 'white-background-color';
}

class Item {
    constructor(init?: Partial<Item>) {
        Object.assign(this, init)
    }

    text?: string;
    obs?: string;
}