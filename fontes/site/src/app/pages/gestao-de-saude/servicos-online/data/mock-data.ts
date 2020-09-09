import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel, IconCardsSectionModel, ButtonModel, SliderModel } from 'src/app/models';
import PersonalizedSectionCards from './personalized-section-cards';
import { VideoModalModel } from 'src/app/models/modal.model';

export const simpleBannerModel: SimpleBannerModel = new SimpleBannerModel({
    title: 'Serviços online',
    description: 'Para você ter mais tempo e se dedicar ao que importa, a Care Plus investe em praticidade, oferecendo serviços a distância. Confira!',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home',
        }),
        new BreadcrumbModel({
            name: 'Gestão de Saúde',
            link: '/gestao-de-saude',
        }),
        new BreadcrumbModel({
            name: 'Serviços Online',
            link: '/gestao-de-saude/servicos-online',
            active: true
        })
    ],
    hasAnchor: true,
    image: 'assets/img/banner-servicos-online-gestao-de-saude-page.jpg'
});

export const medicalOrientationSection = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Orientação médica 24 horas',
    subDescriptions: [
        'A Care Plus possui uma equipe médica composta por clínicos gerais e pediatras disponíveis para atendimento telefônico 24 horas, durante 7 dias por semana, inclusive aos finais de semana e feriados.',
        'Neste canal, os médicos esclarecem dúvidas relacionadas à saúde e podem contribuir com orientações* sobre a necessidade de realização de consulta ambulatorial ou em Pronto Atendimento. ',
        '*Não é realizada consulta médica com prescrição de medicamentos por telefone.'
    ],
    imageSrc: 'assets/img/section-orientacoes-medicas-servicos-online-image.jpg',
    removeLine: false,
    objectFit: 'cover'
});

export const nutriADistancia = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Nutri à distância',
    subDescriptions: [
        'Uma boa alimentação é essencial para levar uma vida saudável e ativa. Entretanto, muitas pessoas, em quase todas as partes do mundo, não comem adequadamente, principalmente por falta de conhecimento e motivação.',
        'Com base nisso, o Programa Nutricionista a distância oferece informações gerais sobre alimentação e nutrição, além da possibilidade de tirar dúvidas com uma nutricionista remotamente. O programa tem duração de, aproximadamente, três meses, com acompanhamentos semanais.',
        'Para participar do programa, você deve preencher o questionário de inscrição e aguardar o nosso contato.'
    ],
    reverse: true,
    imageSrc: 'assets/img/section-nutri-a-distancia-servicos-online-image.jpg',
    removeLine: false,
    objectFit: 'cover'
});

export const iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Conheça nossos programas e serviços',
    bigTitleMaxWidth: 386,
    subDescription: 'Fique por dentro de tudo o que a Care Plus oferece para proporcionar a melhor experiência em saúde.',
    button: new ButtonModel({
        text: 'VEJA TODO OS PROGRAMAS',
        routerLink: '/gestao-de-saude'
    }),
    cards: PersonalizedSectionCards,
    columnClass: 'is-4-desktop'
});

export const sliderModel = new SliderModel({
    type: 'video',
    cardSizes: {
        width: '593px',
        height: '333px',
        space: 16
    },
    images: [
        {
            image: 'assets/img/slider-video-image.jpg',
            thumbImage: 'assets/img/slider-video-image.jpg',
            alt: 'Outubro Rosa',
            title: 'Outubro Rosa',
            modal: new VideoModalModel({
                layout: 'video',
                type: 'info',
            })
        },
        {
            image: 'assets/img/slider-video-image-2.jpg',
            thumbImage: 'assets/img/slider-video-image-2.jpg',
            alt: 'Outubro Rosa',
            title: 'Outubro Rosa',
            modal: new VideoModalModel({
                layout: 'video',
                type: 'info',
            })
        },
    ]
});