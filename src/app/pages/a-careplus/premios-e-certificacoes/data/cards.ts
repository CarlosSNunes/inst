import { PostCardModel, NoticiaModel } from 'src/app/models';

export default [
    new PostCardModel({
        type: 'image',
        post: new NoticiaModel({
            id: 1,
            titulo: "Lorem ipsum dolor sit amet consecte",
            subtitulo: "Lorem ipsum dolor sit amet, consect adi elit. Scelerisque eu sit egestas am dorime",
            caminhoImagem: "assets/img/certified-image.jpg",
        }),
        linkTitle: 'Saiba mais'
    }),
    new PostCardModel({
        type: 'image',
        post: new NoticiaModel({
            id: 1,
            titulo: "Lorem ipsum dolor sit amet consecte",
            subtitulo: "Lorem ipsum dolor sit amet, consect adi elit. Scelerisque eu sit egestas am dorime",
            caminhoImagem: "assets/img/certified-image.jpg",
        }),
        linkTitle: 'Saiba mais'
    }),
    new PostCardModel({
        type: 'image',
        post: new NoticiaModel({
            id: 1,
            titulo: "Lorem ipsum dolor sit amet consecte",
            subtitulo: "Lorem ipsum dolor sit amet, consect adi elit. Scelerisque eu sit egestas am dorime",
            caminhoImagem: "assets/img/certified-image.jpg",
        }),
        linkTitle: 'Saiba mais'
    }),
    new PostCardModel({
        type: 'image',
        post: new NoticiaModel({
            id: 1,
            titulo: "Lorem ipsum dolor sit amet consecte",
            subtitulo: "Lorem ipsum dolor sit amet, consect adi elit. Scelerisque eu sit egestas am dorime",
            caminhoImagem: "assets/img/certified-image.jpg",
        }),
        linkTitle: 'Saiba mais'
    }),
]