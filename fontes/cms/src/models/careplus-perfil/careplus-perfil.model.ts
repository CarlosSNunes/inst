// tslint:disable:typedef-whitespace
export class CareplusPerfilModel {
  public constructor(init?: Partial<CareplusPerfilModel>) {
    Object.assign(this, init);
  }

  id       : number;
  descricao: string;
  selected: boolean;
}
