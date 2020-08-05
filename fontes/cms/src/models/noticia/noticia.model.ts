import { NoticiaTipoModel } from '../noticia-tipo/noticia-tipo.model';
import { BlocoModel } from '../bloco/bloco.model';
import { TagModel } from '../tag/tag.model';

export class NoticiaModel {
    public constructor(init?: Partial<NoticiaModel>) {
        Object.assign(this, init);

        this.bloco = [];
        this.noticiaTag = [];

        if (init) {
            init.bloco.forEach(bloco => this.bloco.push(new BlocoModel(bloco)));
            init.noticiaTag.forEach(tag => this.noticiaTag.push(new TagModel(tag)));
        }
    }

    id: number;
    titulo: string;
    subtitulo: string;
    descricaoPrevia: string;
    dataCadastro: Date;
    dataPublicacao: Date;
    dataExpiracao: Date;
    noticiaTipoId: number;
    caminhoImagem: string;
    nomeImagem: string;
    noticiaTipo: NoticiaTipoModel;
    bloco: BlocoModel[];
    noticiaTag: TagModel[];
}
