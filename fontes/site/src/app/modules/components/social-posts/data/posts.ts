import { InstagramPostModel } from 'src/app/models';

export const postsMock: InstagramPostModel[] = [
    new InstagramPostModel({
        url: 'assets/img/01_Cultivando_lacos.jpg',
        link: 'https://www.instagram.com/p/CI88yg8lT7g/',
        alt: 'Como cultivar laços sociais positivos influencia a sua saúde',
        title: 'Como cultivar laços sociais positivos influencia a sua saúde'
    }),
    new InstagramPostModel({
        url: 'assets/img/02_Fitwel.jpg',
        link: 'https://www.instagram.com/p/CKojiP8l3yG/',
        alt: 'Certificação Fitwel',
        title: 'Certificação Fitwel'
    }),
    new InstagramPostModel({
        url: 'assets/img/03_comece_o_ano_cuidando_de_voce.jpg',
        link: 'https://www.instagram.com/p/CJy_m9jl0BI/',
        alt: 'Comece o ano cuidando de você',
        title: 'Comece o ano cuidando de você'
    }),
    new InstagramPostModel({
        url: 'assets/img/04_Home_office_com_pets.jpg',
        link: 'https://www.instagram.com/p/CIjD1NaHzh2/',
        alt: 'PETS amigos da saúde',
        title: 'PETS amigos da saúde'
    }),
    new InstagramPostModel({
        url: 'assets/img/05_Alimentos_enxaqueca.jpg',
        link: 'https://www.instagram.com/p/CHONJ9VAIjt/',
        alt: 'Alimentos que amenizam a enxaqueca',
        title: 'Alimentos que amenizam a enxaqueca'
    })
]