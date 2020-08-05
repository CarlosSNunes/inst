export class ClienteModel {
    public constructor(init?: Partial<ClienteModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    dataCadastro: Date;
    caminhoImagem: string;
    nomeImagem: string;
}
