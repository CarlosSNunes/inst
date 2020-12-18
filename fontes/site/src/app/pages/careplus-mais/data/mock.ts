import { BreadcrumbModel, ButtonModel, CrossContentModel } from 'src/app/models';

export const crossContentModel: CrossContentModel = new CrossContentModel({
    firstImage: {
        src: 'assets/img/blog-posts-cross-content-image-1.jpg',
        alt: 'Serviços On-line imagem 1'
    },
    secondImage: {
        src: 'assets/img/servicos-online.jpg',
        alt: 'Serviços On-line imagem 2'
    },
    boxContent: {
        title: 'Voce conheçe os nossos Serviços On-line?',
        description: 'Serviços à distância com qualidade, carinho e cuidado. Conheça os serviços que a Care Plus disponibilizar a distância para seus beneciários.',
        button: new ButtonModel({
            text: 'Saiba mais',
            routerLink: '/planos-e-produtos/gestao-de-saude/servicos-online'
        })
    }
});

export const breadcrumbs: BreadcrumbModel[] = [
    new BreadcrumbModel({
        link: '/home',
        name: 'Home'
    }),
    new BreadcrumbModel({
        link: '/careplus-mais',
        name: 'Care Plus +',
        active: true
    })
];