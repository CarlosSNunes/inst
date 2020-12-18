export class DocumentoUpdateModel {
    public constructor(init?: Partial<DocumentoUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    arquivo: File;
}
