export class ResultadoFinanceiroCreateModel {
    public constructor(init?: Partial<ResultadoFinanceiroCreateModel>) {
        Object.assign(this, init);
    }

    titulo: string;
    ano: number;
    dataCorte: Date;
    arquivo: File;
}
