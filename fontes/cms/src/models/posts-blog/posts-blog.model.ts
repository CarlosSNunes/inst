import { TagModel } from '../tag/tag.model';

export class PostsBlogModel {
    public constructor(init?: Partial<PostsBlogModel>) {
        Object.assign(this, init);
        this.result['postTag'] = [];
        if (init) {
            init.result['postTag'].forEach(tag => this.result['postTag'].push(new TagModel(tag)));
        }
    }
    result: [{
        ativo: string; //? ok
        categoriaId: number; //? ok
        dataCadastro: string; //? ok
        dataExpiracao: string | null; //? ok
        dataPublicacao: string; //? ok
        descricao: string; //? ok
        descricaoPaginaSEO: string; //? ok
        descricaoPrevia: string; //? ok
        destaque: string; //? ok
        id: number; //? ok
        nomeImagem: string; //? ok
        postTag: TagModel[]; //? ok
        subtitulo: string; //? ok
        titulo: string; //? ok
        tituloPaginaSEO: string; //? ok
        vizualizacoes: number; //? ok

        CaminhoImagem: string;
        CaminhoCompleto: string;
        CaminhoCompleto_build: string;
        slug: string;
    }]
}
/*//* CONFERIDO ÚLTIMA INTEGRAÇÃO BACKEND - 05/11/2020  */
