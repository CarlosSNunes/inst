export class PerfilModel {
    public constructor(init?: Partial<PerfilModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
}
