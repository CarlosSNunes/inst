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
    linkExterno: string;
    caminhoDesktop: string;
    caminhoMobile: string;
    nomeImagem: string;
    ordem: number;
    tempoExibicao: number;
    ativo: boolean;
    nomeImagemDesktop: string;
}
