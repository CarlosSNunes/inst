import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel, IconCardsSectionModel, ButtonModel, SliderModel, CareplusVideoModel, VideoModalModel } from 'src/app/models';
import PersonalizedSectionCards from './personalized-section-cards';
export const simpleBannerModel: SimpleBannerModel = new SimpleBannerModel({
    title: 'Serviços On-line',
    description: 'Para você ter mais tempo e se dedicar ao que importa, a Care Plus investe em praticidade, oferecendo serviços a distância. Confira!',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/',
        }),
        new BreadcrumbModel({
            name: 'Planos e Produtos',
            link: '/planos-e-produtos',
        }),
        new BreadcrumbModel({
            name: 'Gestão de Saúde',
            link: '/planos-e-produtos/gestao-de-saude',
        }),
        new BreadcrumbModel({
            name: 'Serviços On-line',
            link: '/planos-e-produtos/gestao-de-saude/servicos-online',
            active: true
        })
    ],
    hasAnchor: true,
    image: 'assets/img/servicos-online.jpg'
});

export const medicalOrientationSection = new InfoSectionModel({
    smallTitle: 'SERVIÇOS ON-LINE',
    bigTitle: 'Orientação Médica 24 horas',
    subDescriptions: [
        'A Care Plus possui uma equipe médica composta por clínicos gerais e pediatras disponíveis para atendimento telefônico 24 horas, durante 7 dias por semana, inclusive aos finais de semana e feriados.',
        'Neste canal, os médicos esclarecem dúvidas relacionadas à saúde e podem contribuir com orientações* sobre a necessidade de realização de consulta ambulatorial ou em Pronto Atendimento. ',
        '*Não é realizada consulta médica com prescrição de medicamentos por telefone.'
    ],
    imageSrc: 'assets/img/orientacao-medica.jpg',
    removeLine: false,
    objectFit: 'cover',
    htag: 'h2'
});

export const nutriADistancia = new InfoSectionModel({
    smallTitle: 'SERVIÇOS ON-LINE',
    bigTitle: 'Nutri à Distância',
    subDescriptions: [
        'Uma boa alimentação é essencial para levar uma vida saudável e ativa. Entretanto, muitas pessoas, em quase todas as partes do mundo, não comem adequadamente, principalmente por falta de conhecimento e motivação.',
        'Com base nisso, o Programa Nutricionista a distância oferece informações gerais sobre alimentação e nutrição, além da possibilidade de tirar dúvidas com uma nutricionista remotamente. O programa tem duração de, aproximadamente, três meses, com acompanhamentos semanais.',
        'Para participar do programa, você deve preencher o questionário de inscrição e aguardar o nosso contato.'
    ],
    reverse: true,
    imageSrc: 'assets/img/nutri-a-distancia.jpg',
    removeLine: false,
    objectFit: 'cover',
    htag: 'h3'
});

export const iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Conheça nossos programas e serviços',
    bigTitleMaxWidth: 386,
    subDescription: 'Fique por dentro de tudo o que a Care Plus oferece para proporcionar a melhor experiência em saúde.',
    button: new ButtonModel({
        text: 'Veja todos os Programas de Saúde',
        routerLink: '/planos-e-produtos/gestao-de-saude'
    }),
    cards: PersonalizedSectionCards,
    columnClass: 'is-4-desktop',
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
            image: 'assets/img/thumb-dedicacao.png',
            thumbImage: 'assets/img/thumb-dedicacao.png',
            alt: 'Dedicação Nunca é Demais',
            title: 'Dedicação Nunca é Demais',
            modal: new VideoModalModel({
                layout: 'video',
                type: 'info',
                videoModel: new CareplusVideoModel({
                    bigTitle: 'Dedicação Nunca é Demais',
                    embedSrc: 'https://www.youtube.com/embed/VkJDsgCRrTk'
                })
            })
        },
        {
            image: 'assets/img/thumb-caracteristicas-pessoais.png',
            thumbImage: 'assets/img/thumb-caracteristicas-pessoais.png',
            alt: 'Mito ou Verdade - Características Pessoais',
            title: 'Mito ou Verdade - Características Pessoais',
            modal: new VideoModalModel({
                layout: 'video',
                type: 'info',
                videoModel: new CareplusVideoModel({
                    bigTitle: 'Mito ou Verdade',
                    embedSrc: 'https://www.youtube.com/embed/wAlYQnIJga4'
                })
            })
        },
        {
            image: 'assets/img/thumb-depressao.png',
            thumbImage: 'assets/img/thumb-depressao.png',
            alt: 'Mito ou Verdade - Uma pessoa deprimida pode melhorar quando quiser?',
            title: 'Mito ou Verdade - Uma pessoa deprimida pode melhorar quando quiser?',
            modal: new VideoModalModel({
                layout: 'video',
                type: 'info',
                videoModel: new CareplusVideoModel({
                    bigTitle: 'Mito ou Verdade',
                    embedSrc: 'https://www.youtube.com/embed/FXsnvW28zOI'
                })
            })
        },
        {
            image: 'assets/img/thumb-cuidados-com-a-saude.png',
            thumbImage: 'assets/img/thumb-cuidados-com-a-saude.png',
            alt: 'Dr. Luciano Miller, cuidados com a saúde',
            title: 'Dr. Luciano Miller, cuidados com a saúde',
            modal: new VideoModalModel({
                layout: 'video',
                type: 'info',
                videoModel: new CareplusVideoModel({
                    bigTitle: 'Dr. Luciano Miller, cuidados com a saúde',
                    embedSrc: 'https://www.youtube.com/embed/ydVnaFoCuLg'
                })
            })
        },
    ]
});