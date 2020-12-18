export class LandingPageCreateModel {
    public constructor(init?: Partial<LandingPageCreateModel>) {
        Object.assign(this, init);
    }

    titulo: string;
    subtitulo: string;
    arquivo: File;
    dataPublicacao: Date;
    dataExpiracao: Date;
}
