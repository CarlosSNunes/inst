import { BannerModel } from 'src/app/models';

export default [
    new BannerModel({
        caminhoImagem: "assets/img/banner_home1.png",
        caminhoDesktop: "assets/img/banner_home1.png",
        caminhoMobile: "assets/img/banner_home1.png",
        titulo: "Cuidado da Família",
        descricao: "Oferecemos um canal de acolhimento para crianças portadoras de Transtorno do Espectro Autista, Síndrome de Down e/ou outras condições específicas",
        tempoExibicao: 5000,
        rota: '/planos-e-produtos/gestao-de-saude/programas-preventivos',
        nomeLink: 'Conheça o Cuidado da Família',
        ancora: 'cuidado-da-familia'
    }),
    new BannerModel({
        caminhoImagem: "assets/img/banner_home2.png",
        caminhoDesktop: "assets/img/banner_home2.png",
        caminhoMobile: "assets/img/banner_home2.png",
        titulo: "Mental Health",
        descricao: "Possuímos um canal exclusivo 24 por 7, inclusive aos finais de semana e feriados para acompanhamento e direcionamento em situações de crise psicológica, tanto pessoais e/ou profissionais",
        nomeLink: 'Conheça o Mental Health',
        rota: '/planos-e-produtos/gestao-de-saude/programas-preventivos',
        ancora: 'mental-health',
        tempoExibicao: 5000,
    }),
    new BannerModel({
        caminhoImagem: "assets/img/banner_home3.png",
        caminhoDesktop: "assets/img/banner_home3.png",
        caminhoMobile: "assets/img/banner_home3.png",
        titulo: "Coronavírus e Covid-19",
        descricao: "O coronavírus é uma família de vírus que pode causar infecções respiratórias de graus variados",
        nomeLink: 'Saiba mais informações',
        linkExterno: 'https://www.careplus.com.br/coronavirus/',
        tempoExibicao: 5000,
    }),
];
