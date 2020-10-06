export class CareplusPerfilModel {
    public constructor(init?: Partial<CareplusPerfilModel>) {
        Object.assign(this, init);
    }

    id       : number;
    descricao: string;
    perfilId : number;
//  prioridade: number;
}
