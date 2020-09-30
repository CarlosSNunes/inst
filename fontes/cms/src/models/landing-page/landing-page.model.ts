export class LandingPageModel {
    public constructor(init?: Partial<LandingPageModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    subtitulo: string;
    dataCadastro: Date;
    caminhoImagem: string;
    nomeImagem: string;
    dataPublicacao: Date;
    dataExpiracao: Date;
}
