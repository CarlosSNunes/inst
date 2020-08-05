export class DocumentoTipoCreateModel {
    public constructor(init?: Partial<DocumentoTipoCreateModel>) {
        Object.assign(this, init);
    }

    descricao: string;
}
