import { BannerModel } from 'src/app/models';

export const bannersMock = [
    new BannerModel({
        caminhoImagem:
            'assets/img/banner-diferenciais.jpg',
        titulo: 'Quem ama cuidar da saúde, escolhe Care Plus',
        descricao: 'Atendimento, acolhimento e humanização que fazem toda a diferença na vida de quem contrata, usa e comercializa as nossas soluções.',
        slideAtual: true,
        tempo: 10000
    }),
    new BannerModel({
        caminhoImagem:
            'assets/img/banner-diferenciais.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    }),
    new BannerModel({
        caminhoImagem:
            'assets/img/banner-diferenciais.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    }),
    new BannerModel({
        caminhoImagem:
            'assets/img/banner-diferenciais.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    })
];