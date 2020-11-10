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
    link: string;
    nomeLink: string = 'Saiba Mais';
    caminhoImagem: string;
    nomeImagem: string;
    caminhoCompletoDesktop: string;
    caminhoDesktop: string;
    nomeImagemDesktop: string;
    caminhoCompletoMobile: string;
    caminhoMobile: string;
    nomeImagemMobile: string;
    tempoExibicao: number;
    slideAtual: boolean = false;
    action: string = '';
    firstInteraction: boolean = false;
    bannerState: string;
}
