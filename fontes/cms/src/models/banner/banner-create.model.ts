export class BannerCreateModel {
    public constructor(init?: Partial<BannerCreateModel>) {
        Object.assign(this, init);
    }

    nomeImagem: string;
    nomeImagemDesktop: string;
    nomeImagemMobile: string;
    titulo: string;
    subtitulo: string;
    area: string;
    tempoExibicao: number;
    descricao: string;
    rota: string;
    link: string;
    linkExterno: string;
    arquivo: File;
    arquivoMobile: File;
    nomeLink: string;
    caminhoDesktop: string;
    caminhoMobile: string;
    ativo: string;
    ordem: number;
}

export class BannerListModel {
    constructor(init?: Partial<BannerListModel>) {
        Object.assign(this, init);
    }

    count: number;
    result: BannerListModel[];
}
