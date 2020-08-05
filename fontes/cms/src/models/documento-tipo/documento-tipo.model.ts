export class DocumentoTipoModel {
    public constructor(init?: Partial<DocumentoTipoModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
}
