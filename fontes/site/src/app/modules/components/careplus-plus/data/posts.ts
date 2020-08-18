import { PostCardModel, TagModel, NoticiaTipoModel, NoticiaModel, ButtonModel } from 'src/app/models';

export default [
    new PostCardModel({
        post: new NoticiaModel({
            id: 0,
            titulo: 'Saiba todos os sintomas do Coronavírus',
            subtitulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            descricaoPrevia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum ac at cursus elementum sem adipiscing. Ac urna vitae commodo morbi. Ultricies elementum massa cursus pellentesque.',
            postTag: [
                new TagModel({
                    id: 1,
                    descricao: 'Tema 1',
                    dataCadastro: new Date(),
                    usuarioId: 1,
                    selected: false,
                }),
                new TagModel({
                    id: 2,
                    descricao: 'Tema 2',
                    dataCadastro: new Date(),
                    usuarioId: 2,
                    selected: false,
                })
            ],
            periodoAtivo: 10,
            noticiaTipo: new NoticiaTipoModel({
                id: 1,
                descricao: 'Comunicados e avisos'
            }),
            caminhoImagem: 'http://matheus.careplus.remote.neotix.com.br/images/careplus-plus-post-image-mock.jpg',
            nomeImagem: 'Saiba todos os sintomas do Coronavírus',
            tipoImagem: 'video'
        }),
        button: new ButtonModel({
            routerLink: '/careplus-mais/coronavirus',
            text: 'LER ARTIGO'
        })
    }),
    new PostCardModel({
        post: new NoticiaModel({
            id: 0,
            titulo: 'Saiba todos os sintomas do Coronavírus',
            subtitulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            descricaoPrevia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum ac at cursus elementum sem adipiscing. Ac urna vitae commodo morbi. Ultricies elementum massa cursus pellentesque.',
            postTag: [
                new TagModel({
                    id: 1,
                    descricao: 'Tema 1',
                    dataCadastro: new Date(),
                    usuarioId: 1,
                    selected: false,
                }),
                new TagModel({
                    id: 2,
                    descricao: 'Tema 2',
                    dataCadastro: new Date(),
                    usuarioId: 2,
                    selected: false,
                })
            ],
            periodoAtivo: 10,
            noticiaTipo: new NoticiaTipoModel({
                id: 1,
                descricao: 'Comunicados e avisos'
            }),
            caminhoImagem: 'assets/img/highlight-image-mock.jpg',
            nomeImagem: 'Saiba todos os sintomas do Coronavírus',
            tipoImagem: 'video'
        }),
        button: new ButtonModel({
            routerLink: '/careplus-mais/coronavirus',
            text: 'LER ARTIGO'
        })
    }),
    new PostCardModel({
        post: new NoticiaModel({
            id: 0,
            titulo: 'Saiba todos os sintomas do Coronavírus',
            subtitulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            descricaoPrevia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum ac at cursus elementum sem adipiscing. Ac urna vitae commodo morbi. Ultricies elementum massa cursus pellentesque.',
            postTag: [
                new TagModel({
                    id: 1,
                    descricao: 'Tema 1',
                    dataCadastro: new Date(),
                    usuarioId: 1,
                    selected: false,
                }),
                new TagModel({
                    id: 2,
                    descricao: 'Tema 2',
                    dataCadastro: new Date(),
                    usuarioId: 2,
                    selected: false,
                })
            ],
            periodoAtivo: 10,
            noticiaTipo: new NoticiaTipoModel({
                id: 1,
                descricao: 'Comunicados e avisos'
            }),
            caminhoImagem: 'http://matheus.careplus.remote.neotix.com.br/images/careplus-plus-post-image-mock.jpg',
            nomeImagem: 'Saiba todos os sintomas do Coronavírus',
            tipoImagem: 'video'
        }),
        button: new ButtonModel({
            routerLink: '/careplus-mais/coronavirus',
            text: 'LER ARTIGO'
        })
    }),
    new PostCardModel({
        post: new NoticiaModel({
            id: 0,
            titulo: 'Saiba todos os sintomas do Coronavírus',
            subtitulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            descricaoPrevia: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum ac at cursus elementum sem adipiscing. Ac urna vitae commodo morbi. Ultricies elementum massa cursus pellentesque.',
            postTag: [
                new TagModel({
                    id: 1,
                    descricao: 'Tema 1',
                    dataCadastro: new Date(),
                    usuarioId: 1,
                    selected: false,
                }),
                new TagModel({
                    id: 2,
                    descricao: 'Tema 2',
                    dataCadastro: new Date(),
                    usuarioId: 2,
                    selected: false,
                })
            ],
            periodoAtivo: 10,
            noticiaTipo: new NoticiaTipoModel({
                id: 1,
                descricao: 'Comunicados e avisos'
            }),
            caminhoImagem: 'assets/img/highlight-image-mock.jpg',
            nomeImagem: 'Saiba todos os sintomas do Coronavírus',
            tipoImagem: 'video'
        }),
        button: new ButtonModel({
            routerLink: '/careplus-mais/coronavirus',
            text: 'LER ARTIGO'
        })
    }),
]