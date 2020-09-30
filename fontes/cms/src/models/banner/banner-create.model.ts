export class BannerCreateModel {
    public constructor(init?: Partial<BannerCreateModel>) {
        Object.assign(this, init);
    }
    
    nomeImagem: string;
    titulo: string;
    subtitulo: string;
    area: string;
    tempoExibicao: number;
    descricao: string;
    rota: string;
    linkExterno: string;
    arquivo: File;
    arquivoMobile: File;
    caminhoDesktop: string;
    caminhoMobile: string;    
    ativo: string;   
    ordem: number;    
}
