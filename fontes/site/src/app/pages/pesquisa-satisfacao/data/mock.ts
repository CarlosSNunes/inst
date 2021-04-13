import { BreadcrumbModel, SimpleBannerModel, CardModel, ButtonModel } from 'src/app/models';

export const simpleBannerModel: SimpleBannerModel = new SimpleBannerModel({
    title: 'Pesquisa de Satisfação com Beneficiários',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'Pesquisa de Satisfação',
            link: '/pesquisa-satisfacao',
            active: true
        }),
    ],
    hasAnchor: false,
    hasFilters: true,
    image: 'assets/img/banner-documentos.jpg'
});

export const materiais = [
    new CardModel({
        type: 'default',
        title: 'Pesquisa de Satisfação - 2021 (Base 2020)',
        button: new ButtonModel({
            link: 'assets/documents/pesquisa_de_satisfacao-2021_base_2020.pdf'
        }),
        size: {
            placeholder: '(2.04mb)',
            file_size: '2146328'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Parecer de Auditoria – Pesquisa de Satisfação - 2021 (Base 2020)',
        button: new ButtonModel({
            link: 'assets/documents/parecer_de_auditoria_pesquisa_de_satisfacao-2021_base_2020.pdf'
        }),
        size: {
            placeholder: '(115kb)',
            file_size: '118734'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Pesquisa de Satisfação - 2020 (base 2019)',
        button: new ButtonModel({
            link: 'assets/documents/pesquisa_de_satisfacao_2020_base_2019.pdf'
        }),
        size: {
            placeholder: '(2.26mb)',
            file_size: '2264863'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Parecer de Auditoria - Pesquisa de Satisfação - 2020 (base 2019)',
        button: new ButtonModel({
            link: 'assets/documents/parecer_de_auditoria_pesquisa_de_satisfacao-2020_base_2019.pdf'
        }),
        size: {
            placeholder: '(249kb)',
            file_size: '254982'
        }
    }),
   
]