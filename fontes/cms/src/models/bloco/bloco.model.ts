export class BlocoModel {
    public constructor(init?: Partial<BlocoModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    subtitulo: string;
    descricao: string;
    noticiaId: number;
}
