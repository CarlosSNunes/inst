import { IconCardModel } from 'src/app/models'

export default [
    new IconCardModel({
        type: "icon",
        title: "Rede Plus",
        description: "Saiba mais sobre a Rede Plus, uma rede de profissionais diferente de tudo que você já viu no mercado. Além de sua seleção ter critérios rigorosos que envolvem a formação acadêmica e estrutura de atendimento, esta rede proporciona uma experiência de atendimento excepcional.",
        imagePath: "assets/svg/star-hand.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/rede-plus',
        hasCollapse: true
    }),
    new IconCardModel({
        type: "icon",
        title: "Materiais",
        description: "Encontre todos os materiais e arquivos para download: documentos da ANS, tabela de Produtos e Planos, comunicados e muito mais.",
        imagePath: "assets/svg/document.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/materiais-de-saude',
        hasCollapse: true
    }),
    new IconCardModel({
        type: "icon",
        title: "Carreira",
        description: "Já imaginou fazer parte de uma equipe talentosa, que transforma vidas e a saúde das pessoas diariamente? Trabalhe conosco e dê um passo importante em sua carreira.",
        imagePath: "assets/svg/people.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/carreiras',
        hasCollapse: true
    }),
    new IconCardModel({
        type: "icon",
        title: "Resultados Financeiros",
        description: "Tenha acesso aos nossos registros financeiros dos últimos anos e acompanhe o balanço patrimonial. Mais transparência na prestação de contas.",
        imagePath: "assets/svg/charts.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/resultados-financeiros',
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
        title: "Gestão de Saúde",
        description: "A Gestão de Saúde conta com programas e serviços especiais para nossos beneficiários. Desde ações preventivas até parcerias em empresas de alimentação e consultoria esportiva.",
        imagePath: "assets/svg/medal.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/planos-e-produtos/gestao-de-saude',
        hasCollapse: true
    }),
    new IconCardModel({
        type: "icon",
        title: "Perguntas Frequentes",
        description: "Um espaço para você esclarecer todas as suas dúvidas, serviços disponíveis, rede credenciada e muito mais.",
        imagePath: "assets/svg/faq.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/perguntas-frequentes',
        hasCollapse: true
    }),
    new IconCardModel({
        type: "icon",
        title: "Política de Privacidade",
        description: "Conheça a nossa Política de Privacidade e entenda como funciona nosso sistema de segurança de dados.",
        imagePath: "assets/svg/lock.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/politica-de-privacidade',
        hasCollapse: true
    }),
    new IconCardModel({
        type: "icon",
        title: "Termos & Condições",
        description: "Fique por dentro de todos os termos e condições para usufruir dos serviços e facilidades que proporcionamos.",
        imagePath: "assets/svg/paper.svg",
        backgroundColorClass: "white-background-color",
        routerLink: '/a-careplus/termos-e-condicoes',
        hasCollapse: true
    })
]
