import { TagModel } from '../tag/tag.model';

export class PostsBlogModel {
    public constructor(init?: Partial<PostsBlogModel>) {
        Object.assign(this, init); 
        
        this.postsTag = [];

        if (init) {
            init.postsTag.forEach(tag => this.postsTag.push(new TagModel(tag)));
        }
    }

    id: number;
    titulo: string;
    subtitulo: string;
    descricaoPrevia: string;
    descricao: string;
    dataPublicacao: string;
    dataExpiracao: string | null;    
    dataCadastro: string;
    caminhoImagem: string;
    nomeImagem: string;
    destaque: string;
    ativo: string;
    vizualizacoes: number;
    tituloPaginaSEO: string;
    descricaoPaginaSEO: string;
    categoriaId: number;

    postsTag: TagModel[];
}
