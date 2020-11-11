export class BannerModel {
    public constructor(init?: Partial<BannerModel>) {
        Object.assign(this, init);
    }

    id: number;
    tag: string;
    titulo: string;
    subtitulo: string;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
    rota: string;
    ancora: string;
    linkExterno: string;
    nomeLink: string;
    caminhoImagem: string;
    nomeImagem: string;
    tempo: number;
    slideAtual: boolean = false;
    action: string = '';
    firstInteraction: boolean = false;
    bannerState: string;
}