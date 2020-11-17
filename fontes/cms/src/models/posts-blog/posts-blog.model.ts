import { TagModel } from '../tag/tag.model';

export class PostBlogModel {
    public constructor(init?: Partial<PostBlogModel>) {
        Object.assign(this, init);
        this.postTag = [];
        if (init && init.postTag) {
            init.postTag.forEach(tag => this.postTag.push(new TagModel(tag)));
        }
    }

    id: number;
    ativo: string;
    categoriaId: number;
    dataCadastro: string;
    dataExpiracao: string | null;
    dataPublicacao: string;
    descricao: string;
    descricaoPaginaSEO: string;
    descricaoPrevia: string;
    destaque: string;
    nomeImagem: string;
    postTag: TagModel[];
    subtitulo: string;
    titulo: string;
    tituloPaginaSEO: string;
    vizualizacoes: number;

    CaminhoImagem: string;
    CaminhoCompleto: string;
    CaminhoCompleto_build: string;
    slug: string;
}


export class PostListModel {
    constructor(init?: Partial<PostListModel>) {
        Object.assign(this, init);
    }

    count: number;
    result: PostBlogModel[];
}

/*//* Atualizado  - 17/11/2020  */