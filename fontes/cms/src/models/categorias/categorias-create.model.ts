export class CategoriasCreateModel {
    public constructor(init?: Partial<CategoriasCreateModel>) {
        Object.assign(this, init);
    }
    
    titulo: string;
    descricao: string;     
}
