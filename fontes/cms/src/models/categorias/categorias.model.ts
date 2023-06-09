import { PostBlogModel } from "../posts-blog/posts-blog.model";

export class CategoriasModel {
    public constructor(init?: Partial<CategoriasModel>) {
        Object.assign(this, init);
    }
    id: number;
    titulo: string;
    descricao: string;
    dataCadastro: Date;
    posts: PostBlogModel[];
}

export class CategoriasListModel {
    public constructor(init?: Partial<CategoriasListModel>) {
        Object.assign(this, init);
        this.result['posts'] = [];
        if (init) {
            init.result['posts'].forEach(post => this.result['posts'].push(new PostBlogModel(post)));
        }
    }
    count: number;
    result: CategoriasModel[];
}