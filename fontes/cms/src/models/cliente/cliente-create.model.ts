export class ClienteCreateModel {
    public constructor(init?: Partial<ClienteCreateModel>) {
        Object.assign(this, init);
    }

    descricao: string;
    arquivo: File;
}
