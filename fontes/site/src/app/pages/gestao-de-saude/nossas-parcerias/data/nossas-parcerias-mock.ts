import { SimpleBannerModel, BreadcrumbModel } from 'src/app/models';

export const simpleBannerModel: SimpleBannerModel = {
    title: 'Nossas parcerias',
    description: 'Para você ter acesso a mais vantagens, a Care Plus estabelece parcerias com empresas de alimentação saudável e consultoria esportiva. Conheça!',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Gestão de saúde',
            link: '/gestao-de-saude'
        }),
        new BreadcrumbModel({
            name: 'Nossas Parcerias',
            link: '/gestao-de-saude/nossas-parcerias',
            active: true
        })
    ],
    hasAnchor: true,
    hasFilters: false,
    image: 'assets/img/banner-nossas-parcerias-gestao-de-saude.jpg'
};