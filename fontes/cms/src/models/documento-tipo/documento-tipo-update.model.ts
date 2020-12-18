export class DocumentoTipoUpdateModel {
    public constructor(init?: Partial<DocumentoTipoUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
}
