import { PostsTagCreateModel } from './posts-tag-create.model';

export class PostBlogUpdateModel {
    public constructor(init?: Partial<PostBlogUpdateModel>) {
        Object.assign(this, init);

        this.postsTag = [];        

        if (init.postsTag) {
            init.postsTag.forEach(tag => this.postsTag.push(new PostsTagCreateModel(tag)));
        }
    }
    
    id?: number;
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

    postsTag: PostsTagCreateModel[];
}
