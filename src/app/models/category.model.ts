export class CategoryModel {
    constructor(init?: Partial<CategoryModel>) {
        Object.assign(this, init)
    }

    name: string = '';
    slug: string = '';
    id: number;
}