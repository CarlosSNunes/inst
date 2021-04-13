import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel, ButtonModel, IconCardModel, IconCardsSectionModel } from 'src/app/models';
import PersonalizedServicesCards from './personalized-services';

export const simpleBannerModel: SimpleBannerModel = {
    title: 'Medicina Ocupacional',
    description: 'Cuide da sua empresa e dos seus funcionários criando um ambiente seguro e saudável.',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
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
    smallTitle: 'eSOCIAL',
    bigTitle: 'Conheça o eSocial e entenda como ele unificou todas as bases de saúde ocupacional',
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
    objectFit: 'contain',
    htag: 'h2'
});

export const servicosPersonalizadosSectionModel = new IconCardsSectionModel({
    smallTitle: 'SERVIÇOS PERSONALIZADOS',
    bigTitle: 'Soluções personalizadas em Medicina Ocupacional para a sua empresa',
    subDescription: 'Conte com os melhores serviços de Medicina Ocupacional. Todos eles seguem à risca as Normas Regulamentadoras (NRs). Confira quais são:',
    button: new ButtonModel({
        text: 'Solicite uma Cotação',
        routerLink: '/fale-conosco/solicite-uma-cotacao',
        target: '_self',
        queryParams: {
            medicinaOcupacional: true
        }
    }),
    cards: PersonalizedServicesCards,
    columnClass: 'is-4-desktop',
    htag: 'h3'
});


export const unidadesSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'UNIDADES',
    bigTitle: 'Encontre as unidades para a realização de exames ocupacionais',
    description: 'São diversos estabelecimentos de atendimento distribuídos em várias regiões.',
    subDescription: 'Os trabalhadores podem ser encaminhados para realização de exames ocupacionais (admissional, periódico e demissional) em qualquer uma das unidades em qualquer consultório parceiro.',
    imageSrc: 'assets/img/unidades-image.jpg',
    reverse: true,
    htag: 'h4'
});

export const occupationalSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'MEDICINA OCUPACIONAL',
    bigTitle: 'Excelência médica personalizada + eficiência administrativa',
    subDescriptions: [
        'Fornecemos soluções de saúde premium, por meio de uma ampla variedade de serviços, entre eles, medicina, odontologia, saúde ocupacional e medicina preventiva. Nosso objetivo é proporcionar um cuidado completo à saúde de nossos clientes, ou seja, desde a entrada do colaborador na empresa, prestando suporte ao RH com a parte regulatória do processo de admissão, até a utilização de nossos plano de saúde e odontológico.'
    ],
    imageSrc: 'assets/img/occupational-image-products-page.jpg'
});

export const firstCard: IconCardModel = new IconCardModel({
    title: 'Central de Atendimento',
    type: 'icon',
    button: new ButtonModel({
        link: 'tel: 11 4197-9070',
        text: '(11) 4197-9070',
        target: '_self',
    }),
    imagePath: 'assets/svg/phone.svg',
});

export const secondCard: IconCardModel = new IconCardModel({
    title: 'Solicite uma Cotação',
    type: 'icon',
    button: new ButtonModel({
        text: 'Clique e solicite cotação',
        routerLink: '/fale-conosco/solicite-uma-cotacao',
        target: '_self',
        queryParams: {
            medicinaOcupacional: true
        }
    }),
    imagePath: 'assets/svg/calendar.svg'
});