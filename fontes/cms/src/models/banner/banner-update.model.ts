export class BannerUpdateModel {
    public constructor(init?: Partial<BannerUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
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
    
}
