import { InstagramPostModel } from 'src/app/models';

export const postsMock: InstagramPostModel[] = [
    new InstagramPostModel({
        url: 'assets/img/higienizacao_nasal_infantil.png',
        link: 'https://www.instagram.com/p/CDEMgSPnww_/',
        alt: 'Higiene nasal infantil',
        title: 'Higiene nasal infantil'
    }),
    new InstagramPostModel({
        url: 'assets/img/como_manter_o_quarto_higienizado.png',
        link: 'https://www.instagram.com/p/CCjcS67nzUV/',
        alt: 'Como manter o quarto higienizado',
        title: 'Como manter o quarto higienizado'
    }),
    new InstagramPostModel({
        url: 'assets/img/acao_instituto_devolver.png',
        link: 'https://www.instagram.com/p/CCKEEPsHwxX/',
        alt: 'Ação Instituto Devolver',
        title: 'Ação Instituto Devolver'
    }),
    new InstagramPostModel({
        url: 'assets/img/importancia_do_auto_cuidado.png',
        link: 'https://www.instagram.com/p/CCLx5FYHvwd/',
        alt: 'A importância do autocuidado',
        title: 'A importância do autocuidado'
    }),
    new InstagramPostModel({
        url: 'assets/img/cuidado_com_a_saude_do_coracao.png',
        link: 'https://www.instagram.com/p/CBOS_xkHJqX/',
        alt: 'Cuidando da Saúde do coração',
        title: 'Cuidando da Saúde do coração'
    })
]