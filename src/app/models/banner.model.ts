import { BreadcrumbModel } from './breadcrumb.model';

export class BannerModel {
    public constructor(init?: Partial<BannerModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    subtitulo: string;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
    rota: string;
    linkExterno: string;
    caminhoImagem: string;
    nomeImagem: string;
    tempo: number;
    slideAtual: boolean = false;
    action: string = '';
    firstInteraction: boolean = false;
}
