export class CategoriasUpdateModel {
    public constructor(init?: Partial<CategoriasUpdateModel>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
    descricao: string;  
    
}
