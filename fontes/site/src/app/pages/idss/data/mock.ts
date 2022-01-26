import { BreadcrumbModel, SimpleBannerModel, CardModel, ButtonModel, TableModel, IconCardModel } from 'src/app/models';

export const simpleBannerModel: SimpleBannerModel = new SimpleBannerModel({
    title: 'Encontre todos os materiais disponíveis sobre o IDSS',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'IDSS',
            link: '/idss',
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
        title: 'IDSS 2021',
        category: '2021',
        button: new ButtonModel({
            link: 'assets/documents/idsscareplus-2021.pdf'
        }),
        size: {
            placeholder: '(776kb)',
            file_size: '794624'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'IDSS 2020',
        category: '2020',
        button: new ButtonModel({
            link: 'assets/documents/idsscareplus-2020.pdf'
        }),
        size: {
            placeholder: '(382kb)',
            file_size: '381673'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'IDSS 2019',
        category: '2019',
        button: new ButtonModel({
            link: 'assets/documents/idsscareplus-2019.pdf'
        }),
        size: {
            placeholder: '(1.1mb)',
            file_size: '1059184'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'IDSS 2018',
        category: '2018',
        button: new ButtonModel({
            link: 'assets/documents/idsscareplus-2018.pdf'
        }),
        size: {
            placeholder: '(1.1mb)',
            file_size: '1065856'
        }
    })
];

export const tableMaterials = [
    {
        type: 'default',
        title: 'IDSS 2021',
        category: '2021',
        button: {
            href: 'assets/documents/idsscareplus-2021.pdf',
            title: 'Download',
            icon: '<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17.5385 18.595H0.461538C0.206769 18.595 0 18.8056 0 19.0651C0 19.3246 0.206769 19.5352 0.461538 19.5352H17.5385C17.7932 19.5352 18 19.3246 18 19.0651C18 18.8056 17.7932 18.595 17.5385 18.595ZM8.67354 15.2447C8.76369 15.3365 8.88185 15.3823 9 15.3823C9.11815 15.3823 9.23631 15.3365 9.32646 15.2447L15.9622 8.48585C16.1425 8.3022 16.1425 8.00478 15.9622 7.82113C15.7818 7.63747 15.4898 7.63747 15.3095 7.82113L9.46154 13.7773V1.00526C9.46154 0.745762 9.25477 0.535156 9 0.535156C8.74523 0.535156 8.53846 0.745762 8.53846 1.00526V13.7776L2.69046 7.82113C2.51015 7.63747 2.21815 7.63747 2.03785 7.82113C1.85754 8.00478 1.85754 8.3022 2.03785 8.48585L8.67354 15.2447Z" fill="#0079C8" /> </svg>',
            download: true
        },
        size: {
            placeholder: '(776kb)',
            file_size: '794624'
        }
    },
    {
        type: 'default',
        title: 'IDSS 2020',
        category: '2020',
        button: {
            href: 'assets/documents/idsscareplus-2020.pdf',
            title: 'Download',
            icon: '<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17.5385 18.595H0.461538C0.206769 18.595 0 18.8056 0 19.0651C0 19.3246 0.206769 19.5352 0.461538 19.5352H17.5385C17.7932 19.5352 18 19.3246 18 19.0651C18 18.8056 17.7932 18.595 17.5385 18.595ZM8.67354 15.2447C8.76369 15.3365 8.88185 15.3823 9 15.3823C9.11815 15.3823 9.23631 15.3365 9.32646 15.2447L15.9622 8.48585C16.1425 8.3022 16.1425 8.00478 15.9622 7.82113C15.7818 7.63747 15.4898 7.63747 15.3095 7.82113L9.46154 13.7773V1.00526C9.46154 0.745762 9.25477 0.535156 9 0.535156C8.74523 0.535156 8.53846 0.745762 8.53846 1.00526V13.7776L2.69046 7.82113C2.51015 7.63747 2.21815 7.63747 2.03785 7.82113C1.85754 8.00478 1.85754 8.3022 2.03785 8.48585L8.67354 15.2447Z" fill="#0079C8" /> </svg>',
            download: true
        },
        size: {
            placeholder: '(382kb)',
            file_size: '381673'
        }
    },
    {
        type: 'default',
        title: 'IDSS 2019',
        category: '2019',
        button: {
            href: 'assets/documents/idsscareplus-2019.pdf',
            title: 'Download',
            icon: '<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17.5385 18.595H0.461538C0.206769 18.595 0 18.8056 0 19.0651C0 19.3246 0.206769 19.5352 0.461538 19.5352H17.5385C17.7932 19.5352 18 19.3246 18 19.0651C18 18.8056 17.7932 18.595 17.5385 18.595ZM8.67354 15.2447C8.76369 15.3365 8.88185 15.3823 9 15.3823C9.11815 15.3823 9.23631 15.3365 9.32646 15.2447L15.9622 8.48585C16.1425 8.3022 16.1425 8.00478 15.9622 7.82113C15.7818 7.63747 15.4898 7.63747 15.3095 7.82113L9.46154 13.7773V1.00526C9.46154 0.745762 9.25477 0.535156 9 0.535156C8.74523 0.535156 8.53846 0.745762 8.53846 1.00526V13.7776L2.69046 7.82113C2.51015 7.63747 2.21815 7.63747 2.03785 7.82113C1.85754 8.00478 1.85754 8.3022 2.03785 8.48585L8.67354 15.2447Z" fill="#0079C8" /> </svg>',
            download: true
        },
        size: {
            placeholder: '(1.1mb)',
            file_size: '1059184'
        }
    },
    {
        type: 'default',
        title: 'IDSS 2018',
        category: '2018',
        button: {
            href: 'assets/documents/idsscareplus-2018.pdf',
            title: 'Download',
            icon: '<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17.5385 18.595H0.461538C0.206769 18.595 0 18.8056 0 19.0651C0 19.3246 0.206769 19.5352 0.461538 19.5352H17.5385C17.7932 19.5352 18 19.3246 18 19.0651C18 18.8056 17.7932 18.595 17.5385 18.595ZM8.67354 15.2447C8.76369 15.3365 8.88185 15.3823 9 15.3823C9.11815 15.3823 9.23631 15.3365 9.32646 15.2447L15.9622 8.48585C16.1425 8.3022 16.1425 8.00478 15.9622 7.82113C15.7818 7.63747 15.4898 7.63747 15.3095 7.82113L9.46154 13.7773V1.00526C9.46154 0.745762 9.25477 0.535156 9 0.535156C8.74523 0.535156 8.53846 0.745762 8.53846 1.00526V13.7776L2.69046 7.82113C2.51015 7.63747 2.21815 7.63747 2.03785 7.82113C1.85754 8.00478 1.85754 8.3022 2.03785 8.48585L8.67354 15.2447Z" fill="#0079C8" /> </svg>',
            download: true
        },
        size: {
            placeholder: '(1.1mb)',
            file_size: '1065856'
        }
    }
]

export const Table = new TableModel({
    headItems: [
        {
            title: 'title',
            text: 'Título'
        },
        {
            title: 'button',
            text: 'Download'
        }
    ],
    bodyItems: tableMaterials,
});

export const Cards = [
    new IconCardModel({
        type: 'icon',
        title: 'Rede Plus',
        description: 'Descubra a Rede Plus, uma seleção de médicos que possuem diferenciação curricular, estrutura de atendimento e relacionamento único com a Care Plus.',
        imagePath: 'assets/svg/star-hand.svg',
        routerLink: '/a-careplus/rede-plus'
    }),
    new IconCardModel({
        type: "icon",
        title: "Materiais de Saúde",
        description: "Encontre todos os materiais e arquivos para download: documentos da ANS, tabela de Produtos e Planos, comunicados e muito mais.",
        imagePath: "assets/svg/document.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/materiais-de-saude',
        hasCollapse: false
    }),
    new IconCardModel({
        type: 'icon',
        title: 'Carreiras',
        description: 'Já imaginou fazer parte de um time que transforma a vida das pessoas todos os dias? Veja a nossa proposta para a sua carreira e integre um time que está cada vez mais transformando vidas e sonhos de pessoas e empresas.',
        imagePath: 'assets/svg/business.svg',
        routerLink: '/carreiras'
    })
];