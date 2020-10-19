import { BreadcrumbModel, SimpleBannerModel, CardModel, ButtonModel } from 'src/app/models';

export const simpleBannerModel: SimpleBannerModel = new SimpleBannerModel({
    title: 'Compliance: encontre todos os materiais disponíveis sobre a ANS',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'Compliance',
            link: '/compliance',
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
        title: 'ANS - Norma Técnica Nº 45',
        button: new ButtonModel({
            link: 'assets/documents/nota-tecnica-45.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'ANS - RN 412 - Cartilha de Exclusão de Beneficiários',
        button: new ButtonModel({
            link: 'assets/documents/cartilha_cancelamento_ou_exclusao_de_contrato.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'ANS - RN 412 - Artigo 15',
        button: new ButtonModel({
            link: 'assets/documents/artigo15_rn412.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'ANS - RN 389 - Anexo 1',
        button: new ButtonModel({
            link: 'assets/documents/ANS_RN_389_Anexo_1.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2013',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2013.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2014',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2014.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2015',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2015.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2016',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2016.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2017',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2017.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2018',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2018.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2019',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2019.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2020',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2020.pdf'
        })
    }),
];