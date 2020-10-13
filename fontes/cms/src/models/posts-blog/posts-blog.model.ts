import { TagModel } from '../tag/tag.model';

export class PostsBlogModel {
    public constructor(init?: Partial<PostsBlogModel>) {
        Object.assign(this, init); 
        
        this.postTag = [];

        if (init) {
            init.postTag.forEach(tag => this.postTag.push(new TagModel(tag)));
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

    postTag: TagModel[];
}
