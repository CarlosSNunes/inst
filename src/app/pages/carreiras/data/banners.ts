import { BannerModel } from 'src/app/models';

export const bannersMock = [
    new BannerModel({
        caminhoImagem:
            'http://matheus.careplus.remote.neotix.com.br/images/banner.jpg',
        titulo: 'Quem ama cuidar da saúde, escolhe Care Plus',
        descricao: 'Atendimento, acolhimento e humanização que fazem toda a diferença na vida de quem contrata, usa e comercializa as nossas soluções.',
        slideAtual: true,
        tempo: 10000
    }),
    new BannerModel({
        caminhoImagem:
            'http://matheus.careplus.remote.neotix.com.br/images/banner.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    }),
    new BannerModel({
        caminhoImagem:
            'http://matheus.careplus.remote.neotix.com.br/images/banner.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    }),
    new BannerModel({
        caminhoImagem:
            'http://matheus.careplus.remote.neotix.com.br/images/banner.jpg',
        titulo: 'Careplus',
        descricao: 'Melhor operadora',
        tempo: 5000
    })
];