import { ButtonModel } from './button.model';
import { TagModel } from './tag.model';
import { NoticiaModel } from './noticia.model';

export class CardModel {
    public constructor(init?: Partial<CardModel>) {
        Object.assign(this, init);
    }

    type?: string = 'default';
    title: string;
    description?: string;
    category?: string;
    link?: string;
    linkTitle?: string;
    target?: string = '_blank';
    backgroundColorClass?: string = 'white-background-color';
    id: any;
    button?: ButtonModel;
}

export class IconCardModel extends CardModel {
    public constructor(init?: Partial<IconCardModel>) {
        super(init)
        this.target = '_blank';
        Object.assign(this, init);
        this.type = "icon";
    }
    imagePath: string;
    hasCollapse?: boolean = false;
}


export class PostCardModel extends CardModel {
    public constructor(init?: Partial<PostCardModel>) {
        super(init)
        this.linkTitle = 'LER ARTIGO'
        Object.assign(this, init);
        this.type = "post";
    }

    post: NoticiaModel;
}