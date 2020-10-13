export class PerfilCreateModel {
  public constructor(init?: Partial<PerfilCreateModel>) {
    Object.assign(this, init);
  }
  id: number;
  descricao: string;
}
