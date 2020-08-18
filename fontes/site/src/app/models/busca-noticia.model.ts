export class BuscaNoticiaModel {
    public constructor(init?: Partial<BuscaNoticiaModel>) {
        Object.assign(this, init);
    }

    texto: string;
    tagId: number;
    noticiaTipoId: number;
}
