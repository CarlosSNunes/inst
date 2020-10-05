export class CareplusPerfilCreateModel {
    
    public constructor(init?: Partial<CareplusPerfilCreateModel>) {
        Object.assign(this, init);
    }
    
    perfilId : number;
    descricao: string;
}
