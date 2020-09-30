export class NoticiaTipoModel {
    public constructor(init?: Partial<NoticiaTipoModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
}
