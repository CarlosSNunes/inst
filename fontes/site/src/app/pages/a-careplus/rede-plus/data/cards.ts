import { IconCardModel } from 'src/app/models';

export default [
    new IconCardModel({
        type: "icon",
        title: "Responsabilidade Social",
        description: "Mais do que cuidar da saúde dos nossos beneficiários e apoiar as empresas nessa missão, nos preocupamos em contribuir com a sociedade e o meio ambiente.",
        imagePath: "assets/svg/earth.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/responsabilidade-social',
        hasCollapse: true
    }),
    new IconCardModel({
        type: "icon",
        title: "Materiais",
        description: "Encontre todos os materiais e arquivos para download: documentos da ANS, tabela de Produtos e Planos, comunicados e muito mais.",
        imagePath: "assets/svg/document.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/materiais',
        hasCollapse: true
    }),
    new IconCardModel({
        type: 'icon',
        title: 'Carreiras',
        description: 'Já imaginou fazer parte de um time que transforma a vida das pessoas todos os dias? Veja a nossa proposta para a sua carreira e integre um time que está cada vez mais transformando vidas e sonhos de pessoas e empresas.',
        imagePath: 'assets/svg/business.svg',
        routerLink: '/carreiras'
    })
];