import { BreadcrumbModel, ButtonModel, HeroBannerModel, IconCardModel, IconCardsSectionModel, InfoSectionModel, PlanCardModel, VideoModel } from 'src/app/models';
import Cards from './cards';

export const ocupationalSection = new InfoSectionModel({
    smallTitle: 'MEDICINA OCUPACIONAL',
    bigTitle: 'Mais saúde e qualidade no ambiente de trabalho',
    description: 'A Care Plus tem o melhor serviço de Medicina Ocupacional para a sua empresa',
    subDescription: 'Conte com todo o suporte na realização de exames admissionais, demissionais, periódicos e muito mais.',
    imageSrc: 'assets/img/home-ocupacional.jpg',
    button: new ButtonModel({
        text: 'Conheça o Medicina Ocupacional',
        routerLink: '/planos-e-produtos/medicina-ocupacional',
        class: 'btn-digital-orange secondary medium arrow-right',
        touchClass: 'btn-digital-orange tertiary small arrow-right',
    }),
    htag: 'h3'
});
export const planCards: PlanCardModel[] = [
    new PlanCardModel({
        title: 'Care Plus Soho',
        subTitle: 'Para 2 a 29 vidas',
        description: 'O Care Plus SoHo apresenta planos para pequenas empresas, de 2 a 29 vidas e é indicado para aquelas que atuam em home office ou com operações mais enxutas.',
        button: new ButtonModel({
            text: 'Conheça o Care Plus Soho',
            routerLink: '/planos-e-produtos/careplus-soho'
        }),
        image: 'assets/svg/plans-soho.svg',
        id: 'careplus-soho'
    }),
    new PlanCardModel({
        title: 'Clube Care Plus',
        subTitle: 'Para 30 a 200 vidas',
        description: 'O Clube Care Plus apresenta planos para empresas, de 30 a 200 vidas e é indicado para aquelas que estão em crescimento e expandindo seus negócios.',
        button: new ButtonModel({
            text: 'Conheça o Clube Care Plus',
            routerLink: '/planos-e-produtos/clube-careplus'
        }),
        image: 'assets/svg/clube-careplus.svg',
        id: 'clube-careplus'
    }),
    new PlanCardModel({
        title: 'Care Plus Empresarial',
        subTitle: 'Para mais de 200 vidas',
        description: 'O Care Plus Empresarial apresenta planos totalmente customizáveis, para mais de 200 vidas e é indicado para grandes empresas.',
        button: new ButtonModel({
            text: 'Conheça o Care Plus Empresarial',
            routerLink: '/planos-e-produtos/careplus-empresarial'
        }),
        image: 'assets/svg/empresarial.svg',
        id: 'careplus-empresarial'
    })
];
export const iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Programas e serviços exclusivos: a melhor experiência em saúde',
    subDescription: 'Mais do que cuidado, a Care Plus proporciona facilidade e comodidade para todos os beneficiários e empresas.',
    button: new ButtonModel({
        text: 'Conheça o Gestão de Saúde',
        routerLink: '/a-careplus/gestao-de-saude'
    }),
    cards: Cards,
    columnClass: 'is-3-desktop',
    htag: 'h4'
    
});
export const secondCard: IconCardModel = new IconCardModel({
    title: 'Solicite uma Cotação',
    type: 'icon',
    button: new ButtonModel({
        routerLink: '/fale-conosco/solicite-uma-cotacao',
        text: 'Clique e solicite cotação',
    }),
    imagePath: 'assets/svg/calendar.svg'
});
export const heroBannerModel: HeroBannerModel = new HeroBannerModel({
    video: new VideoModel(
        {
            url: 'assets/videos/video-teste.mp4',
            type: 'video/mp4'
        }
    ),
    contentContainerMaxWidth: 862,
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'Planos e Produtos',
            link: '/planos-e-produtos',
            active: true
        })
    ]
});