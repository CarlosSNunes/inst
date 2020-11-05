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
        title: 'Pesquisa de Satisfação - 2020 (base 2019)',
        button: new ButtonModel({
            link: 'assets/documents/pesquisa_de_satisfacao_2020_base_2019.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Parecer de Auditoria - Pesquisa de Satisfação - 2020 (base 2019)',
        button: new ButtonModel({
            link: 'assets/documents/parecer_de_auditoria_pesquisa_de_satisfacao-2020_base_2019.pdf'
        })
    }),
]