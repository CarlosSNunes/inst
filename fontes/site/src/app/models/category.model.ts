export class CategoryModel {
    constructor(init?: Partial<CategoryModel>) {
        Object.assign(this, init)
    }

    titulo: string = '';
    descricao: string = '';
    id: number;
}