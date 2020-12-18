export class DocumentoCreateModel {
    public constructor(init?: Partial<DocumentoCreateModel>) {
        Object.assign(this, init);
    }

    descricao: string;
    arquivo: File;
}
