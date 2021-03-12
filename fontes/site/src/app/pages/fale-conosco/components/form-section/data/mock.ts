import { BreadcrumbModel, FormSectionModel } from "src/app/models";

export const chanelForms: FormSectionModel[] = [
    new FormSectionModel({
        title: 'Solicite uma Cotação',
        id: 1,
        active: true,
        slug: 'solicite-uma-cotacao',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/',
            }),
            new BreadcrumbModel({
                name: 'Fale Conosco',
                link: '/fale-conosco',
            }),
            new BreadcrumbModel({
                name: 'Solicite uma Cotação',
                link: '/fale-conosco/solicite-uma-cotacao',
                active: true
            })
        ]
    }),
    new FormSectionModel({
        title: 'Contato',
        id: 2,
        active: false,
        slug: 'contato',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/',
            }),
            new BreadcrumbModel({
                name: 'Fale Conosco',
                link: '/fale-conosco',
            }),
            new BreadcrumbModel({
                name: 'Contato',
                link: '/fale-conosco/contato',
                active: true
            })
        ]
    }),
    new FormSectionModel({
        title: 'Canal de Denúncias',
        id: 3,
        active: false,
        slug: 'canal-de-denuncias',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/',
            }),
            new BreadcrumbModel({
                name: 'Fale Conosco',
                link: '/fale-conosco',
            }),
            new BreadcrumbModel({
                name: 'Canal de Denúncias',
                link: '/fale-conosco/canal-de-denuncias',
                active: true
            })
        ]
    })
];

export const activeChanel: FormSectionModel = new FormSectionModel({
    title: 'Solicite uma Cotação',
    id: 1,
    active: true,
    slug: 'solicite-uma-cotacao',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/',
        }),
        new BreadcrumbModel({
            name: 'Fale Conosco',
            link: '/fale-conosco/solicite-uma-cotacao',
        }),
        new BreadcrumbModel({
            name: 'Solicite uma Cotação',
            link: '/fale-conosco/solicite-uma-cotacao',
            active: true
        })
    ]
});