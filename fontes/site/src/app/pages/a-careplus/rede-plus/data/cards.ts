import { IconCardModel } from 'src/app/models';

export default [
        new IconCardModel({
        type: 'icon',
        title: 'Perguntas Frequentes',
        description: 'Um espaço para você esclarecer todas as suas dúvidas, serviços disponíveis, rede credenciada e muito mais.',
        imagePath: 'assets/svg/faq.svg',
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/perguntas-frequentes',
        hasCollapse: true
    }),
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
        title: "Materiais de Saúde",
        description: "Encontre todos os materiais e arquivos para download: documentos da ANS, tabela de Produtos e Planos, comunicados e muito mais.",
        imagePath: "assets/svg/document.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/materiais-de-saude',
    })
];