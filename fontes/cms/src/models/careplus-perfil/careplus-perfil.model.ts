export class CareplusPerfilModel {
    public constructor(init?: Partial<CareplusPerfilModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    dataCadastro: Date;
    usuarioId: number;
}
