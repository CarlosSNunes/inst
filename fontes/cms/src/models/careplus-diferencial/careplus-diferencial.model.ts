export class CareplusDiferencialModel {
    public constructor(init?: Partial<CareplusDiferencialModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    subtitulo: string;
    descricao: string;
    dataCadastro: Date;
    caminhoImagem: string;
    nomeImagem: string;
}
