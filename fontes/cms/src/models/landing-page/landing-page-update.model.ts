export class LandingPageUpdateModel {
    public constructor(init?: Partial<LandingPageUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    subtitulo: string;
    arquivo: File;
    dataPublicacao: Date;
    dataExpiracao: Date;
}
