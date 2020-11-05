export class CategoryModel {
    constructor(init?: Partial<CategoryModel>) {
        Object.assign(this, init)
    }

    titulo: string = '';
    descricao: string = '';
    id: number;
}

export class PaginatedCategoryModel {
    constructor(init?: Partial<PaginatedCategoryModel>) {
        Object.assign(this, init)

        if (init && init.result && init.result.length > 0) {
            this.result = new Array<CategoryModel>();
            init.result.forEach(category => {
                this.result.push(new CategoryModel(category));
            })
        }
    }
    count: number = 0;
    result: CategoryModel[];
}