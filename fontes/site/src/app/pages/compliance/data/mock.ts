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

export const materiais: CardModel[] = [
    new CardModel({
        type: 'default',
        title: 'ANS - Norma Técnica Nº 45',
        button: new ButtonModel({
            link: 'assets/documents/nota-tecnica-45.pdf'
        }),
        size: {
            placeholder: '(1.1mb)',
            file_size: '1112282'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'ANS - RN 412 - Cartilha de Exclusão de Beneficiários',
        button: new ButtonModel({
            link: 'assets/documents/cartilha_cancelamento_ou_exclusao_de_contrato.pdf'
        }),
        size: {
            placeholder: '(1.78mb)',
            file_size: '1768968'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'ANS - RN 412 - Artigo 15',
        button: new ButtonModel({
            link: 'assets/documents/artigo15_rn412.pdf'
        }),
        size: {
            placeholder: '(213kb)',
            file_size: '213027'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'ANS - RN 389 - Anexo 1',
        button: new ButtonModel({
            link: 'assets/documents/ANS_RN_389_Anexo_1.pdf'
        }),
        size: {
            placeholder: '(143kb)',
            file_size: '143783'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2021',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2021.pdf',
        }),
        size: {
            placeholder: '(107kb)',
            file_size: '109148'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2020',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2020.pdf'
        }),
        size: {
            placeholder: '(112kb)',
            file_size: '112167'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2019',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2019.pdf'
        }),
        size: {
            placeholder: '(343kb)',
            file_size: '343374'
        }

    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2018',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2018.pdf'
        }),
        size: {
            placeholder: '(316kb)',
            file_size: '316584'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2017',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2017.pdf'
        }),
        size: {
            placeholder: '(354kb)',
            file_size: '354434'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2016',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2016.pdf'
        }),
        size: {
            placeholder: '(386kb)',
            file_size: '386757'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2015',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2015.pdf'
        }),
        size: {
            placeholder: '(60kb)',
            file_size: '60329'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2014',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2014.pdf'
        }),
        size: {
            placeholder: '(459kb)',
            file_size: '459208'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Contratos Coletivos do Pool de Risco 2013',
        button: new ButtonModel({
            link: 'assets/documents/contratos_coletivos_do_pool_de_risco_2013.pdf'
        }),
        size: {
            placeholder: '(33kb)',
            file_size: '33379'
        }
    })
];