import { PostsTagCreateModel } from './posts-tag-create.model';

export class PostsBlogCreateModel {
    public constructor(init?: Partial<PostsBlogCreateModel>) {
        Object.assign(this, init);
        this.postTag = [];

        init.postTag.forEach(tag => this.postTag.push(new PostsTagCreateModel(tag)));
    }

    titulo: string;
    subtitulo: string;
    descricaoPrevia: string;
    descricao: string;
    dataPublicacao: string;
    dataExpiracao?: string;
    arquivo: File;
    caminhoImagem: string;
    nomeImagem: string;
    destaque: string;
    ativo: string;
    vizualizacoes: number;
    tituloPaginaSEO: string;
    descricaoPaginaSEO: string;
    categoriaId: number;

    postTag: PostsTagCreateModel[];
}
