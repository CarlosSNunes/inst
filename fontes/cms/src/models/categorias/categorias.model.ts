export class CategoriasModel {
    public constructor(init?: Partial<CategoriasModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    descricao: string;  
}
