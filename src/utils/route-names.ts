import { RouteModel } from 'src/app/models';

export const routes: RouteModel[] = [
    new RouteModel({
        route: '/home',
        description: 'Home'
    }),
    new RouteModel({
        route: '/home/beneficiario',
        description: 'Beneficiário'
    }),
    new RouteModel({
        route: '/home/rh',
        description: 'Gestor rh'
    }),
    new RouteModel({
        route: '/home/corretor',
        description: 'Corretor'
    }),
    new RouteModel({
        route: '/home/credenciado',
        description: 'Credenciado'
    }),
    new RouteModel({
        route: '/fale-conosco',
        description: 'Fale conosco'
    }),
    new RouteModel({
        route: '/blog',
        description: 'Blog'
    }),
    new RouteModel({
        route: '/blog',
        description: 'Blog'
    }),
    new RouteModel({
        route: '/produtos',
        description: 'Produtos'
    }),
    new RouteModel({
        route: '/a-careplus',
        description: 'A Careplus'
    }),
    new RouteModel({
        route: '/a-careplus/documentos',
        description: 'A Careplus - Documentos'
    }),
    new RouteModel({
        route: '/a-careplus/premios-e-certificacoes',
        description: 'A Careplus - Premios e certificações'
    }),
    new RouteModel({
        route: '/a-careplus/responsabilidade-social',
        description: 'A Careplus - Responsabilidade social'
    }),
    new RouteModel({
        route: '/a-careplus/faq',
        description: 'A Careplus - Faq'
    }),
    new RouteModel({
        route: '/a-careplus/resultados-financeiros',
        description: 'A Careplus - Resultados Financeiros'
    }),
    new RouteModel({
        route: '/a-careplus/termos-e-condicoes',
        description: 'A Careplus - Termos e condições'
    }),
    new RouteModel({
        route: '/a-careplus/politica-de-privacidade',
        description: 'A Careplus - Politica de privacidade'
    }),
    new RouteModel({
        route: '/a-careplus/rede-plus',
        description: 'A Careplus - Rede Plus'
    }),
    new RouteModel({
        route: '/a-careplus/carreiras',
        description: 'A Careplus - Carreiras'
    }),
    new RouteModel({
        route: '/a-careplus/carreiras/vagas',
        description: 'A Careplus - Carreiras - Vagas'
    }),
    new RouteModel({
        route: (number) => `/a-careplus/carreiras/vagas/${number}`,
        description: 'A Careplus - Carreiras - Detalhes da vaga'
    }),
    new RouteModel({
        route: '/personal-system',
        description: 'Personal System'
    }),
    new RouteModel({
        route: '/produtos-e-planos-careplus',
        description: 'Produtos e planos Careplus'
    }),
    new RouteModel({
        route: '/produtos-e-planos-careplus/clube-careplus',
        description: 'Produtos e planos - Clube Careplus'
    }),
    new RouteModel({
        route: '/produtos-e-planos-careplus/soho',
        description: 'Produtos e planos - Soho'
    }),
    new RouteModel({
        route: '/produtos-e-planos-careplus/empresarial',
        description: 'Produtos e planos - Empresarial'
    }),
    new RouteModel({
        route: '/produtos-e-planos-careplus/medicina-ocupacional',
        description: 'Produtos e planos - Medicina Ocupacional'
    }),
    new RouteModel({
        route: '/carreiras-careplus',
        description: 'Carreiras'
    }),
    new RouteModel({
        route: '/gestao-de-saude',
        description: 'Gestão de saude'
    }),
    new RouteModel({
        route: '/gestao-de-saude/personal-system',
        description: 'Personal System - Gestão de saude'
    }),
    new RouteModel({
        route: '/gestao-de-saude/programas-preventivos',
        description: 'Programas Preventivos - Gestão de saude'
    }),
    new RouteModel({
        route: '/gestao-de-saude/servicos-online',
        description: 'Serviços online - Gestão de saude'
    }),
    new RouteModel({
        route: '/gestao-de-saude/nossas-parcerias',
        description: 'Nossas parcerias - Gestão de saude'
    }),
    new RouteModel({
        route: '/careplus-mais',
        description: 'Care Plus +'
    }),
    new RouteModel({
        route: (slug) => `/careplus-mais/${slug}`,
        description: 'Detalhes do post - Care Plus +'
    }),
]