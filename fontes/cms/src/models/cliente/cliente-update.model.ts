export class ClienteUpdateModel {
    public constructor(init?: Partial<ClienteUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    arquivo: File;
}
