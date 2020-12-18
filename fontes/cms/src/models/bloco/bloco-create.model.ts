export class BlocoCreateModel {
    public constructor(init?: Partial<BlocoCreateModel>) {
        Object.assign(this, init);
    }

    titulo: string;
    subtitulo: string;
    descricao: string;
}
