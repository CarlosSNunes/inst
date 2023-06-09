import { ButtonModel } from './button.model';
import { NoticiaModel } from './noticia.model';

export class CardModel {
    public constructor(init?: Partial<CardModel>) {
        Object.assign(this, init);
    }

    type?: string = 'default';
    title: string;
    description?: string;
    category?: string;
    backgroundColorClass?: string = 'white-background-color';
    id: any;
    button?: ButtonModel;
    routerLink: string;
    fragment: string;
    size:any;
    href: string;
}

export class IconCardModel extends CardModel {
    public constructor(init?: Partial<IconCardModel>) {
        super(init)
        Object.assign(this, init);
        this.type = "icon";
    }
    imagePath: string;
    hasCollapse?: boolean = false;
}


export class PostCardModel<T = any> extends CardModel {
    public constructor(init?: Partial<PostCardModel>) {
        super(init)
        Object.assign(this, init);
        this.type = "post";
    }

    post: NoticiaModel;
    modalContent: T;
}


export class PromoCardModel extends CardModel {
    public constructor(init?: Partial<PromoCardModel>) {
        super(init)
        Object.assign(this, init);
        this.type = "promo";
    }

    mainTitles: MainTitle[] = [];
    promoImage: string = '';
    logo: string;
    desciptions: string[] = [];
}

class MainTitle {
    public constructor(init?: Partial<MainTitle>) {
        Object.assign(this, init)
    }

    bigTitle: string;
    smallTitle: string;
}