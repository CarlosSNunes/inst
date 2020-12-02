export class BannerUpdateModel {
    public constructor(init?: Partial<BannerUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    nomeImagem: string;
    nomeImagemMobile: string;
    titulo: string;
    subtitulo: string;
    area: string;
    tempoExibicao: number;
    descricao: string;
    rota: string;
    linkExterno: string;
    arquivo: File;
    arquivoMobile: File;
    nomeLink: string;
    caminhoDesktop: string;
    caminhoMobile: string;
    ativo: string;

}
export class BannerListModel {
    constructor(init?: Partial<BannerListModel>) {
        Object.assign(this, init);
    }

    count: number;
    result: BannerListModel[];
}
