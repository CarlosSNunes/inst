export class CareplusPerfilUpdateModel {
  public constructor(init?: Partial<CareplusPerfilUpdateModel>) {
    Object.assign(this, init);
  }

  descricao: string;
  perfilId: number;
}
