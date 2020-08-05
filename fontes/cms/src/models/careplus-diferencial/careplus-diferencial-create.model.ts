export class CareplusDiferencialCreateModel {
    public constructor(init?: Partial<CareplusDiferencialCreateModel>) {
        Object.assign(this, init);
    }

    titulo: string;
    subtitulo: string;
    descricao: string;
    arquivo: File;
}
