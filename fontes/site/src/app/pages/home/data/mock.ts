import { ButtonModel, CareplusVideoModel, IconCardsSectionModel, InfoSectionModel } from 'src/app/models';
import Cards from './cards';

export const ocupationalSection = new InfoSectionModel({
    smallTitle: 'MEDICINA OCUPACIONAL',
    bigTitle: 'Mais saúde e qualidade no ambiente de trabalho',
    description: 'A Care Plus tem o melhor serviço de Medicina Ocupacional para a sua empresa',
    subDescription: 'Conte com todo o suporte na realização de exames admissionais, demissionais, periódicos e muito mais.',
    imageSrc: 'assets/img/occupational.jpg',
    button: new ButtonModel({
        text: 'SAIBA MAIS',
        routerLink: '/planos-e-produtos/medicina-ocupacional',
        class: 'btn-digital-orange secondary arrow-right',
        touchClass: 'btn-digital-orange tertiary arrow-right'
    })
})
export const videoModel: CareplusVideoModel = new CareplusVideoModel({
    smallTitle: 'A CARE PLUS',
    bigTitle: 'A maior operadora de saúde premium com 27 anos de mercado',
    embedSrc: 'https://www.youtube.com/embed/-f9weYoBxD8',
    button: new ButtonModel({
        text: 'CONHEÇA A CARE PLUS',
        title: 'CONHEÇA A CARE PLUS',
        routerLink: '/a-careplus'
    })
});
export const iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Programas e serviços exclusivos: a melhor experiência em saúde',
    subDescription: 'Mais do que cuidado, a Care Plus proporciona facilidade e comodidade para todos os beneficiários e empresas.',
    button: new ButtonModel({
        text: 'CONHEÇA NOSSOS PROGRAMAS',
        routerLink: '/gestao-de-saude',
        class: 'btn-digital-cian secondary arrow-right'
    }),
    cards: Cards,
    columnClass: 'is-3-desktop'
});