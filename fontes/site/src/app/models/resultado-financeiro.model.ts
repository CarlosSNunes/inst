export class ResultadoFinanceiroModel {
    public constructor(init?: Partial<ResultadoFinanceiroModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    dataCadastro: Date;
    usuarioId: number;
    caminhoPdf: string;
    nomePdf: string;
    ano: number;
    dataCorte: Date;
}
