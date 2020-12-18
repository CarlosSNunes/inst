export class CareplusDepoimentoUpdateModel {
    public constructor(init?: Partial<CareplusDepoimentoUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    autor: string;
}
