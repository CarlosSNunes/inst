export class FaleConoscoAutoFields {
    constructor(init?: Partial<FaleConoscoAutoFields>) {
        Object.assign(this, init);
    }

    plano: string = '';
    planoSaude: boolean = false;
    planoOdontologico: boolean = false;
    planoMedicinal: boolean = false;
}