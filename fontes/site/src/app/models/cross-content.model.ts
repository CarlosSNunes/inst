import { ButtonModel } from './button.model';

export class CrossContentModel {
    constructor(init?: Partial<CrossContentModel>) {
        this.htag = 'h3';
        Object.assign(this, init)
    }

    bigTitle?: string;
    firstImage?: Image;
    secondImage?: Image;
    boxContent?: BoxContent;
    htag: string = 'h3';
}

class Image {
    constructor(init?: Partial<Image>) {
        Object.assign(this, init)
    }

    src: string = '';
    alt: string = '';
}

class BoxContent {
    constructor(init?: Partial<BoxContent>) {
        Object.assign(this, init)
    }

    title?: string = '';
    description?: string = '';
    button?: ButtonModel;
}