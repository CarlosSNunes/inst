export class BannerModel {
    public constructor(init?: Partial<BannerModel>) {
        Object.assign(this, init);

        // TODO tratativas temporárias, possível que o futuro estas regras de negócio fiquem no backend.
        this.caminhoDesktop = `${init.caminhoDesktop}/${init.nomeImagemDesktop}`;
        this.caminhoMobile = `${init.caminhoMobile}/${init.nomeImagemMobile}`;
        this.tempoExibicao = init.tempoExibicao * 1000;
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
    nomeLink: string = 'Saiba Mais';
    caminhoImagem: string;
    nomeImagem: string;
    caminhoDesktop: string;
    nomeImagemDesktop: string;
    caminhoMobile: string;
    nomeImagemMobile: string;
    tempoExibicao: number;
    slideAtual: boolean = false;
    action: string = '';
    firstInteraction: boolean = false;
    bannerState: string;
}
