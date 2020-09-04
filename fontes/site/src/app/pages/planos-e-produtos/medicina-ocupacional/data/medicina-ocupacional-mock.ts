import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel, ButtonModel, IconCardModel } from 'src/app/models';

export const simpleBannerModel: SimpleBannerModel = {
    title: 'Medicina Ocupacional',
    description: 'Cuide da sua empresa e dos seus funcionários criando um ambiente seguro e saudável.',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Planos e Produtos',
            link: '/planos-e-produtos'
        }),
        new BreadcrumbModel({
            name: ' Medicina Ocupacional',
            link: '/planos-e-produtos/medicina-ocupacional',
            active: true
        })
    ],
    hasAnchor: false,
    hasFilters: false,
    image: 'assets/img/medicina-ocupacional-banner.jpg'
};

export const eSocialSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'E-SOCIAL',
    bigTitle: 'Conheça o E-Social e entenda como ele unificou todas as bases de saúde ocupacional',
    subDescriptions: [
        'O Decreto nº 8373/2014 instituiu o Sistema de Escrituração Digital das Obrigações Fiscais, Previdenciárias e Trabalhistas (eSocial). Por meio desse sistema, os empregadores passarão a comunicar ao Governo, de forma unificada, as informações relativas aos trabalhadores, como vínculos, contribuições previdenciárias, folha de pagamento, comunicações de acidente de trabalho, aviso prévio, escriturações fiscais e informações sobre o FGTS.',
        'Esse novo modelo traz outras vantagens, como: '
    ],
    imageSrc: 'assets/svg/e-social-image.svg',
    items: [
        {
            text: 'Registro imediato de novas informações, como a contratação de um empregado'
        },
        {
            text: 'Integração de processos',
        },
        {
            text: 'Disponibilização imediata dos dados aos órgãos envolvidos.'
        }
    ],
    removeLine: true,
    objectFit: 'contain'
});

export const unidadesSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'UNIDADES',
    bigTitle: 'Encontre as unidades para a realização de exames ocupacionais',
    description: 'São diversos estabelecimentos de atendimento distribuídos em várias regiões.',
    subDescription: 'Os trabalhadores podem ser encaminhados para realização de exames ocupacionais (admissional, periódico e demissional) em qualquer uma das unidades da nossa parceira Qualywork.',
    imageSrc: 'assets/img/unidades-image.jpg',
    reverse: true
});

export const occupationalSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'MEDICINA OCUPACIONAL',
    bigTitle: 'Excelência médica personalizada + eficiência administrativa',
    subDescriptions: [
        'Além de oferecer qualidade no atendimento de saúde, o serviço de Medicina Ocupacional também contribui com a gestão de pessoas da sua empresa.',
        'Todas as nossas soluções propiciam facilidades e um ambiente mais seguro e agradável.',
        'Acreditamos que pessoas sadias e felizes trabalham mais motivadas e resultam em maior produtividade.'
    ],
    imageSrc: 'assets/img/occupational-image-products-page.jpg'
});

export const secondCard: IconCardModel = new IconCardModel({
    title: 'Solicite uma Cotação',
    type: 'icon',
    button: new ButtonModel({
        text: 'Clique e solicite cotação',
        routerLink: '/fale-conosco',
        queryParams: {
            planoMedicinal: true
        }
    }),
    imagePath: 'assets/svg/calendar.svg'
});
