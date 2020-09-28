import { SimpleBannerModel, BreadcrumbModel } from 'src/app/models';

export const simpleBannerModel: SimpleBannerModel = {
    title: 'Nossas Parcerias',
    description: 'Para você ter acesso a mais vantagens, a Care Plus estabelece parcerias com empresas de alimentação saudável e consultoria esportiva. Conheça!',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Gestão de Saúde',
            link: '/planos-e-produtos/gestao-de-saude'
        }),
        new BreadcrumbModel({
            name: 'Nossas Parcerias',
            link: '/planos-e-produtos/gestao-de-saude/nossas-parcerias',
            active: true
        })
    ],
    hasAnchor: true,
    hasFilters: false,
    image: 'assets/img/banner-nossas-parcerias.jpg'
};