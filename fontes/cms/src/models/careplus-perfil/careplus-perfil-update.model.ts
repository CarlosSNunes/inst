export class CareplusPerfilUpdateModel {
    public constructor(init?: Partial<CareplusPerfilUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
}
