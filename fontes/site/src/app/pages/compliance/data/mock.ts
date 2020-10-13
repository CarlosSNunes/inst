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
        title: 'ANS - Cartilha de Exclusão de Beneficiário – RN 412',
        button: new ButtonModel({
            link: 'assets/documents/cartilha_cancelamento_ou_exclusao_de_contrato.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'ANS - Artigo 15 – RN 412',
        button: new ButtonModel({
            link: 'assets/documents/artigo15_rn412.pdf'
        })
    }),
]