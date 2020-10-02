import { CareplusVideoModel } from './careplus-video.model';

export class ModalModel {
    public constructor(init?: Partial<ModalModel>) {
        Object.assign(this, init)
    }

    type: 'info' | 'error';
    layout: 'feedback' | 'table' | 'content' | 'video';
    title: string;
}


export class ContentModalModel extends ModalModel {
    public constructor(init?: Partial<ContentModalModel>) {
        super(init)
        this.type = 'info';
        this.layout = 'content';
        Object.assign(this, init)
    }

    smallTitle: string = '';
    paragraphs: Paragraph[] = [];
    imagePath: string = '';
}


export class FeedbackModalModel extends ModalModel {
    public constructor(init?: Partial<FeedbackModalModel>) {
        super(init)
        this.type = 'info';
        this.layout = 'feedback';
        Object.assign(this, init)
    }

    title = "Formulário enviado com sucesso!";
    description: string = "Nós recebemos a sua mensagem em breve vamos entrar em contato com você de acordo com a sua necessidade"
    buttonText: string = "VOLTAR PARA O SITE"
}

export class ErrorModalModel extends ModalModel {
    public constructor(init?: Partial<ErrorModalModel>) {
        super(init)
        this.type = 'info';
        this.layout = 'table';
        Object.assign(this, init)
    }
    title: string = 'Confira os produtos atendidos por este credenciado:';
}

export class TableModalModel extends ModalModel {
    public constructor(init?: Partial<TableModalModel>) {
        super(init)
        this.type = 'info';
        this.layout = 'feedback';
        Object.assign(this, init)
    }

    title: string = 'Ops! :( não conseguimos enviar seu formulário'
    description: string = 'Encontramos algum erro no envio do seu formulário, verifique se todos os campos estão corretos e envie novamente.'
    buttonText: string = "VOLTAR PARA O SITE"
    items: Array<any> = []
}


export class Paragraph {
    constructor(init?: Partial<Paragraph>) {
        Object.assign(this, init)
    }

    title: string = '';
    text: string = '';
}


export class VideoModalModel extends ModalModel {
    constructor(init?: Partial<VideoModalModel>) {
        super(init)
        this.type = 'info';
        this.layout = 'video';
        Object.assign(this, init);
    }

    videoModel: CareplusVideoModel = new CareplusVideoModel({
        bigTitle: 'Por que somos apaixonados pela Care Plus?',
        embedSrc: 'https://www.youtube.com/embed/-f9weYoBxD8'
    });

}