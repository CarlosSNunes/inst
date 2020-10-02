import { IconCardModel } from 'src/app/models';

export const Cards = [
    new IconCardModel({
        type: 'icon',
        title: 'Rede Plus',
        description: 'Descubra a Rede Plus, uma seleção de médicos que possuem diferenciação curricular, estrutura de atendimento e relacionamento único com a Care Plus.',
        imagePath: 'assets/svg/star-hand.svg',
        routerLink: '/a-careplus/rede-plus'
    }),
    new IconCardModel({
        type: 'icon',
        title: 'Resultados Financeiros',
        description: 'Tenha acesso aos nossos registros financeiros dos últimos anos e acompanhe o nosso balanço patrimonial. Mais transparência na prestação de contas.',
        imagePath: 'assets/svg/charts.svg',
        routerLink: '/a-careplus/resultados-financeiros'
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Materiais de Saúde",
        "description": "Encontre todos os materiais e arquivos para download: documentos da ANS, tabela de Produtos e Planos, comunicados e muito mais.",
        "routerLink": '/a-careplus/materiais-de-saude',
        "imagePath": "assets/svg/document.svg",
        "backgroundColorClass": "white-background-color",
        "hasCollapse": false
    })
]