import { BreadcrumbModel } from 'src/app/models';

export const origins: {
    id: string,
    message: string,
    title: string,
    breadcrumbs: BreadcrumbModel[]
}[] = [
        {
            id: 'solicite-uma-cotacao',
            message: 'Obrigado por enviar sua Solicitação de Cotação. A Care Plus, operadora líder em saúde premium no Brasil retornará sua solicitação o mais breve possível.',
            title: 'Obrigado | Fale Conosco | Care Plus',
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
                    link: '/fale-conosco/solicite-uma-cotacao'
                }),
                new BreadcrumbModel({
                    name: 'Obrigado',
                    link: '/fale-conosco/solicite-uma-cotacao/obrigado',
                    active: true
                })
            ]
        },
        {
            id: 'contato',
            message: 'Obrigado por enviar seu Contato. A Care Plus, operadora líder em saúde premium no Brasil retornará seu contato o mais breve possível.',
            title: 'Obrigado | Contato | Care Plus',
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
                    link: '/fale-conosco/contato'
                }),
                new BreadcrumbModel({
                    name: 'Obrigado',
                    link: '/fale-conosco/contato/obrigado',
                    active: true
                })
            ]
        },
        {
            id: 'canal-de-denuncias',
            message: 'Obrigado por enviar sua Denúncia. A Care Plus, operadora líder em saúde premium no Brasil retornará sua denúncia o mais breve possível.',
            title: 'Obrigado | Canal de Denúncias | Care Plus',
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
                    link: '/fale-conosco/canal-de-denuncias'
                }),
                new BreadcrumbModel({
                    name: 'Obrigado',
                    link: '/fale-conosco/canal-de-denuncias/obrigado',
                    active: true
                })
            ]
        },
        {
            id: 'ouvidoria',
            message: 'Obrigado por enviar sua Ouvidoria. A Care Plus, operadora líder em saúde premium no Brasil retornará sua ouvidoria o mais breve possível.',
            title: 'Obrigado | Ouvidoria | Care Plus',
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
                    name: 'Ouvidoria',
                    link: '/fale-conosco/ouvidoria'
                }),
                new BreadcrumbModel({
                    name: 'Obrigado',
                    link: '/fale-conosco/ouvidoria/obrigado',
                    active: true
                })
            ]
        }
    ];