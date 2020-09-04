export class SliderModel {
    constructor(init?: Partial<SliderModel>) {
        Object.assign(this, init)
    }

    type: 'image' | 'video' = 'image';
    images: object[] = [];
    cardSizes = {
        width: '280px',
        height: '364px',
        space: 16
    };
    hasBackgroundColorWhite: boolean = false;
}


export class SliderImage<T = any> {
    constructor(init?: Partial<SliderImage>) {
        Object.assign(init, this);
    }

    image: string;
    thumbImage: string;
    alt: string;
    title: string;
    modal: T;
}