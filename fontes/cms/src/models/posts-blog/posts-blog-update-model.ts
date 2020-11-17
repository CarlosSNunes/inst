import getDifferences from 'src/utils/date-difference';
import { DateDifference } from '../date-difference/date-difference.model';
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

        if (init) {
            if (init.postTag && init.postTag.length > 0) {
                init.postTag.forEach(tag => this.postTag.push(new PostsTagCreateModel(tag)));

                if (init.getDateDifferences) {
                    this.dateDifferences = getDifferences(new Date(), init.dataCadastro);
                }
            }
        }
    }

    id?: number;
    slug: string;
    titulo: string;
    subtitulo: string;
    descricaoPrevia: string;
    dateDifferences: DateDifference;
    descricao: string;
    dataCadastro: Date;
    dataPublicacao: Date;
    dataExpiracao?: Date;
    arquivo: File;
    categoria: string;
    caminhoImagem: string;
    caminhoCompleto: string;
    nomeImagem: string;
    destaque: string;
    ativo: string;
    vizualizacoes: number;
    tituloPaginaSEO: string;
    descricaoPaginaSEO: string;
    categoriaId: number;
    getDateDifferences: boolean = false;
    postTag: PostsTagCreateModel[] = [];
}
