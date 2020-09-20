import { BannerModel } from 'src/app/models';

export const bannersMock =  [
    new BannerModel({
        caminhoImagem:
            'assets/img/banner-credenciado.jpg',
        titulo: 'O cuidado com a sua saúde, no conforto de sua casa',
        descricao:
            'Com o Saúde em Casa, a Care Plus proporciona aos seus beneficiários consultas domiciliares nas especialidades de pediatria e clínico geral. ',
        slideAtual: true,
        tempo: 10000
    }),
    new BannerModel({
        caminhoImagem:
            'assets/img/banner-credenciado.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    }),
    new BannerModel({
        caminhoImagem:
            'assets/img/banner-credenciado.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    }),
    new BannerModel({
        caminhoImagem:
            'assets/img/banner-credenciado.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    })
];