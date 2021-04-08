import { ButtonModel, CareplusVideoModel, IconCardsSectionModel, InfoSectionModel } from 'src/app/models';
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
        class: 'btn-digital-orange secondary arrow-right',
        touchClass: 'btn-digital-orange tertiary arrow-right'
    })
})
export const videoModel: CareplusVideoModel = new CareplusVideoModel({
    smallTitle: 'A CARE PLUS',
    bigTitle: 'A maior operadora de saúde premium com quase 30 anos de mercado',
    embedSrc: 'https://www.youtube.com/embed/VkJDsgCRrTk',
    button: new ButtonModel({
        text: 'Conheça a Care Plus',
        title: 'Conheça a Care Plus',
        routerLink: '/a-careplus'
    })
});
export const iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Programas e serviços exclusivos: a melhor experiência em saúde',
    subDescription: 'Mais do que cuidado, a Care Plus proporciona facilidade e comodidade para todos os beneficiários e empresas.',
    button: new ButtonModel({
        text: 'Conheça o Gestão de Saúde',
        routerLink: '/a-careplus/gestao-de-saude',
        class: 'btn-digital-cian secondary arrow-right'
    }),
    cards: Cards,
    columnClass: 'is-3-desktop'
});
