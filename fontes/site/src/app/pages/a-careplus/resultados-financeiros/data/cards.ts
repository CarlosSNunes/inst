import { IconCardModel } from 'src/app/models';

export default [
    new IconCardModel({
        type: 'icon',
        title: 'Rede Plus',
        description: 'Descubra a Rede Plus, uma seleção de médicos que possuem diferenciação curricular, estrutura de atendimento e relacionamento único com a Care Plus.',
        imagePath: 'assets/svg/star-hand.svg',
        routerLink: '/a-careplus/rede-plus'
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