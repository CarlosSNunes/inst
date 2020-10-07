import { BlocoModel } from './bloco.model';
import { TagModel } from './tag.model';
import { NoticiaTipoModel } from './noticia-tipo.model';

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
        }
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
    visualizações: number = 0;
    tituloPaginaSEO: string = '';
    descricaoPaginaSEO: string = '';
    categoriaId: number;
    categoriaModel: any;
    postTag: TagModel[];

    // Used only on front-end
    tipoImagem: 'imagem' | 'video' = 'imagem';

    // Unresolved fields.
    noticiaTipo: NoticiaTipoModel;
    bloco: BlocoModel[];
}