import { TagModel } from '../tag/tag.model';

export class PostsBlogModel {
    public constructor(init?: Partial<PostsBlogModel>) {
        Object.assign(this, init);
        this.result['postTag'] = [];
        if (init) {
            init.result['postTag'].forEach(tag => this.result['postTag'].push(new TagModel(tag)));
        }
    }
    count: number;
    result: [{
        id: number;
        ativo: string;
        categoriaId: number;
        dataCadastro: string;
        dataExpiracao: string | null;
        dataPublicacao: string;
        descricao: string;
        descricaoPaginaSEO: string;
        descricaoPrevia: string;
        destaque: string;
        nomeImagem: string;
        postTag: TagModel[];
        subtitulo: string;
        titulo: string;
        tituloPaginaSEO: string;
        vizualizacoes: number;

        CaminhoImagem: string;
        CaminhoCompleto: string;
        CaminhoCompleto_build: string;
        slug: string;
    }]
}
/*//* CONFERIDO ÚLTIMA INTEGRAÇÃO BACKEND - 05/11/2020  */
