import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel } from 'src/app/models';

export const simpleBannerModel: SimpleBannerModel = {
    title: 'Programa empresariais',
    description: 'Conte com as melhores soluções em saúde para a sua empresa e os seus funcionários. Conheça todos os serviços!',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Gestão de Saúde',
            link: '/gestao-de-saude'
        }),
        new BreadcrumbModel({
            name: 'Programas Empresariais',
            link: '/gestao-de-saude/programas-empresariais',
            active: true
        })
    ],
    hasAnchor: true,
    hasFilters: false,
    image: 'assets/img/banner-programas-empresariais-gestao-de-saude.jpg'
};

export const campanhaDeQuestionariosSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Circuito de aferições e Campanhas de questionários',
    subDescriptions: [
        'Neste serviço, a Care Plus investiga o perfil de saúde dos funcionários por meio de um questionário.',
        'Assim, de acordo com as características identificadas, os beneficiários podem ser encaminhados para acompanhamentos e tratamentos adequados, disponíveis nos programas da Gestão de Saúde.'
    ],
    imageSrc: 'assets/img/section-campanha-de-questionatios-gestao-de-saude-image.jpg',
    removeLine: false,
    objectFit: 'cover',
});

export const nutriNaEmpresa: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Nutri na empresa',
    subDescriptions: [
        'O objetivo é estimular a reeducação alimentar por meio de recomendações nutricionais individualizadas, que seguem as preferências dos indivíduos e os estilos de vida adotados.'
    ],
    imageSrc: 'assets/img/section-nutri-na-empresa-gestao-de-saude-image.jpg',
    reverse: true,
    removeLine: false,
    objectFit: 'cover',
});

export const nutriMais: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Nutri Mais',
    subDescriptions: [
        'Este programa, que funciona como uma consultoria em nutrição realizada por profissionais capacitados, tem como finalidade oferecer soluções nutricionais personalizadas para as empresas, de acordo com as necessidades e a cultura organizacional.'
    ],
    imageSrc: 'assets/img/section-nutri-mais-gestao-de-saude-image.jpg',
    removeLine: false,
    objectFit: 'cover',
});