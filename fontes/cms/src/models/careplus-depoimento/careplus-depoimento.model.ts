export class CareplusDepoimentoModel {
    public constructor(init?: Partial<CareplusDepoimentoModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    autor: string;
    dataCadastro: Date;
}
