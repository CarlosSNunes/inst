import { TagModel } from './tag.model';
import { DateDifference } from './date-difference.model';
import GetDifferences from 'src/utils/date-difference';

export class NoticiaModel {
    public constructor(init?: Partial<NoticiaModel>) {
        Object.assign(this, init);

        this.postTag = [];

        if (init) {
            if (init.postTag) {
                init.postTag.forEach(tag => this.postTag.push(new TagModel(tag)));
            }

            if (init.getDateDifferences) {
                this.dateDifferences = GetDifferences(new Date(), init.dataCadastro);
            }
        }
    }

    slug: string;
    id: number;
    titulo: string;
    subtitulo: string;
    descricaoPrevia: string;
    descricao: string;
    dataPublicacao: Date;
    dataExpiracao: Date;
    dataCadastro: Date;
    caminhoCompleto: string;
    caminhoImagem: string;
    nomeImagem: string;
    destaque: number = 0;
    periodoAtivo: number;
    ativo: number = 0;
    vizualizacoes: number = 0;
    tituloPaginaSEO: string = '';
    descricaoPaginaSEO: string = '';
    categoriaId: number;
    categoria: any;
    postTag: TagModel[];

    // Used only on front-end
    tipoImagem: 'imagem' | 'video' = 'imagem';
    getDateDifferences: boolean = false;
    dateDifferences: DateDifference;
}


export class NoticiasPaginadas {
    constructor(init?: Partial<NoticiasPaginadas>) {
        Object.assign(this, init);
        if (init && init.result && init.result.length > 0) {
            this.result = new Array<NoticiaModel>();
            init.result.forEach(noticia => {
                this.result.push(new NoticiaModel(noticia));
            });
        }
    }

    count: number = 0;
    result: Array<NoticiaModel> = [];
}