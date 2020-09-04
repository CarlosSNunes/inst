export class SliderModel<T = any> {
    constructor(init?: Partial<SliderModel>) {
        Object.assign(this, init)
    }

    type: 'image' | 'video' = 'image';
    images: Object[] = [];
    cardSizes = {
        width: '280px',
        height: '364px',
        space: 16
    };
    hasBackgroundColorWhite: boolean = false;
    modal: T;
}