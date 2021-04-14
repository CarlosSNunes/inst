import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel, IconCardsSectionModel, ButtonModel } from 'src/app/models';
import PersonalizedSectionCards from './personalized-section-cards';

export const simpleBannerModel: SimpleBannerModel = {
    title: 'Programa Empresariais',
    description: 'Conte com as melhores soluções em saúde para a sua empresa e os seus funcionários. Conheça todos os serviços!',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'A Care Plus',
            link: '/a-careplus',
        }),
        new BreadcrumbModel({
            name: 'Gestão de Saúde',
            link: '/a-careplus/gestao-de-saude'
        }),
        new BreadcrumbModel({
            name: 'Programas Empresariais',
            link: '/a-careplus/gestao-de-saude/programas-empresariais',
            active: true
        })
    ],
    hasAnchor: true,
    hasFilters: false,
    image: 'assets/img/banner-programas-empresariais.jpg'
};

export const campanhaDeQuestionariosSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'PROGRAMAS EMPRESARIAIS',
    bigTitle: 'Circuito de Aferições e Campanhas de Questionários ',
    subDescriptions: [
        'Neste serviço, a Care Plus investiga o perfil de saúde dos funcionários por meio de um questionário.',
        'Assim, de acordo com as características identificadas, os beneficiários podem ser encaminhados para acompanhamentos e tratamentos adequados, disponíveis nos programas da Gestão de Saúde.'
    ],
    imageSrc: 'assets/img/circuito-de-afericoes.jpg',
    removeLine: false,
    objectFit: 'cover',
    htag: 'h2'
});

export const nutriNaEmpresa: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'PROGRAMAS EMPRESARIAIS',
    bigTitle: 'Nutri na empresa',
    subDescriptions: [
        'O objetivo é estimular a reeducação alimentar por meio de recomendações nutricionais individualizadas, que seguem as preferências dos indivíduos e os estilos de vida adotados.'
    ],
    imageSrc: 'assets/img/nutri-na-empresa.jpg',
    reverse: true,
    removeLine: false,
    objectFit: 'cover',
    htag: 'h3'
});

export const nutriMais: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'PROGRAMAS EMPRESARIAIS',
    bigTitle: 'Nutri Mais',
    subDescriptions: [
        'Este programa, que funciona como uma consultoria em nutrição realizada por profissionais capacitados, tem como finalidade oferecer soluções nutricionais personalizadas para as empresas, de acordo com as necessidades e a cultura organizacional.'
    ],
    imageSrc: 'assets/img/nutri-mais.jpg',
    removeLine: false,
    objectFit: 'cover',
    htag: 'h4'
});

export const gestaoDeSaudeSection: IconCardsSectionModel = new IconCardsSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Conheça nossos programas e serviços',
    subDescription: 'Fique por dentro de tudo o que a Care Plus oferece para proporcionar a melhor experiência em saúde.',
    button: new ButtonModel({
        text: 'Veja todos os Programas de Saúde',
        routerLink: '/planos-e-produtos/gestao-de-saude'
    }),
    cards: PersonalizedSectionCards,
    columnClass: 'is-4-desktop',
    htag: 'h5'
});
