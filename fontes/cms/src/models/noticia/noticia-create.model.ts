import { BlocoCreateModel } from '../bloco/bloco-create.model';
import { NoticiaTagCreateModel } from './noticia-tag-create.model';

export class NoticiaCreateModel {
    public constructor(init?: Partial<NoticiaCreateModel>) {
        Object.assign(this, init);
        this.bloco = [];
        this.noticiaTag = [];

        init.bloco.forEach(bloco => this.bloco.push(new BlocoCreateModel(bloco)));
        init.noticiaTag.forEach(tag => this.noticiaTag.push(new NoticiaTagCreateModel(tag)));
    }

    titulo: string;
    subtitulo: string;
    descricaoPrevia: string;
    dataPublicacao: string;
    dataExpiracao: string;
    noticiaTipoId: number;
    bloco: BlocoCreateModel[];
    noticiaTag: NoticiaTagCreateModel[];
    arquivo: File;
}
