export class NoticiaTipoUpdateModel {
    public constructor(init?: Partial<NoticiaTipoUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
}
