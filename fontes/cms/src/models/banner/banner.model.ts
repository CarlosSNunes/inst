export class BannerModel {

    public constructor(init?: Partial<BannerModel>) {
        Object.assign(this, init);
    }
    id: number;
    titulo: string;
    subtitulo: string;
    descricao: string;
    area: string;
    usuarioId: number;
    dataCadastro: Date;
    rota: string;
    link: string;
    linkExterno: string;
    caminhoDesktop: string;
    caminhoCompletoDesktop: string;
    caminhoMobile: string;
    caminhoCompletoMobile: string;
    nomeImagem: string;
    nomeLink: string;
    ordem: number;
    tempoExibicao: number;
    ativo: boolean;
    nomeImagemDesktop: string;
    nomeImagemMobile: string;
}
export class BannerListModel {
    constructor(init?: Partial<BannerListModel>) {
        Object.assign(this, init);
    }

    count: number;
    result: BannerListModel[];
}
