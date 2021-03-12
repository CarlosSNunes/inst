export class NoticiaTipoCreateModel {
    public constructor(init?: Partial<NoticiaTipoCreateModel>) {
        Object.assign(this, init);
    }

    descricao: string;
}
