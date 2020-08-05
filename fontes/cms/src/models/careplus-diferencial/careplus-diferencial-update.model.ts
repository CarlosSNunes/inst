export class CareplusDiferencialUpdateModel {
    public constructor(init?: Partial<CareplusDiferencialUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    subtitulo: string;
    descricao: string;
    arquivo: File;
}
