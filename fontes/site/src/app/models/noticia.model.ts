import { BlocoModel } from './bloco.model';
import { TagModel } from './tag.model';
import { NoticiaTipoModel } from './noticia-tipo.model';
import { DateDifference } from './date-difference.model';
import GetDifferences from 'src/utils/date-difference';

export class NoticiaModel {
    public constructor(init?: Partial<NoticiaModel>) {
        Object.assign(this, init);

        this.bloco = [];
        this.postTag = [];

        if (init) {
            if (init.bloco) {
                init.bloco.forEach(bloco => this.bloco.push(new BlocoModel(bloco)));
            }

            if (init.postTag) {
                init.postTag.forEach(tag => this.postTag.push(new TagModel(tag)));
            }

            if (init.getDateDifferences) {
                this.dateDifferences = GetDifferences(new Date(), init.dataCadastro);
            }
        }

        this.caminhoImagem = `${this.caminhoImagem}/${this.nomeImagem}`;
    }

    slug: string;
    id: number;
    titulo: string;
    subtitulo: string;
    descricaoPrevia: string;
    corpoDescricao: string;
    dataPublicacao: Date;
    dataExpiracao: Date;
    dataCadastro: Date;
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

    // Unresolved fields.
    noticiaTipo: NoticiaTipoModel;
    bloco: BlocoModel[];
}