export class ResultadoFinanceiroUpdateModel {
    public constructor(init?: Partial<ResultadoFinanceiroUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    ano: number;
    dataCorte: Date;
    arquivo: File;
}
