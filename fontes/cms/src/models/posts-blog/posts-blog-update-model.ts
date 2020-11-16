import { PostsTagCreateModel } from './posts-tag-create.model';

export class PostBlogUpdateModel {
    public constructor(init?: Partial<PostBlogUpdateModel>) {
        Object.assign(this, init);

        this.postTag = []

        if (typeof (init.destaque) == 'boolean') {
            if (init.destaque) {
                this.destaque = '1';
            } else {
                this.destaque = '0';
            }
        }

        if (init.postTag.length > 0) {
            init.postTag.forEach(tag => this.postTag.push(new PostsTagCreateModel(tag)));
        }
    }

    id?: number;
    titulo: string;
    subtitulo: string;
    descricaoPrevia: string;
    descricao: string;
    dataPublicacao: Date;
    dataExpiracao?: Date;
    arquivo: File;
    caminhoImagem: string;
    caminhoCompleto: string;
    nomeImagem: string;
    destaque: string;
    ativo: string;
    vizualizacoes: number;
    tituloPaginaSEO: string;
    descricaoPaginaSEO: string;
    categoriaId: number;

    postTag: PostsTagCreateModel[] = [];
}
