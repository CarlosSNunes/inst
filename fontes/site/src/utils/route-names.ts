import { RouteModel } from 'src/app/models';

export const routes: RouteModel[] = [
    new RouteModel({
        route: '/',
        description: 'Home'
    }),
    new RouteModel({
        route: '/sou-beneficiario',
        description: 'Home - Beneficiário'
    }),
    new RouteModel({
        route: '/sou-rh',
        description: 'Home - Gestor de RH'
    }),
    new RouteModel({
        route: '/sou-corretor',
        description: 'Home - Corretor'
    }),
    new RouteModel({
        route: '/sou-credenciado',
        description: 'Home - Credenciado'
    }),
    new RouteModel({
        route: '/fale-conosco',
        description: 'Fale conosco - Solicite uma Cotação'
    }),
    new RouteModel({
        route: '/fale-conosco/solicite-uma-cotacao',
        description: 'Fale conosco - Solicite uma Cotação'
    }),
    new RouteModel({
        route: '/fale-conosco/contato',
        description: 'Fale conosco - Contato'
    }),
    new RouteModel({
        route: '/fale-conosco/ouvidoria',
        description: 'Fale conosco - Ouvidoria'
    }),
    new RouteModel({
        route: '/fale-conosco/canal-de-denuncias',
        description: 'Fale conosco - Canal de Denúncias'
    }),
    new RouteModel({
        route: '/a-careplus',
        description: 'Home - A Care Plus'
    }),
    new RouteModel({
        route: '/a-careplus/diferenciais',
        description: 'A Care Plus - Diferenciais'
    }),
    new RouteModel({
        route: '/a-careplus/materiais-de-saude',
        description: 'A Care Plus - Materiais de Saúde'
    }),
    new RouteModel({
        route: '/a-careplus/premios-e-certificacoes',
        description: 'A Care Plus - Premios e Certificações'
    }),
    new RouteModel({
        route: '/a-careplus/responsabilidade-social',
        description: 'A Care Plus - Responsabilidade Social'
    }),
    new RouteModel({
        route: '/a-careplus/perguntas-frequentes',
        description: 'A Care Plus - Perguntas Frequentes'
    }),
    new RouteModel({
        route: '/a-careplus/resultados-financeiros',
        description: 'A Care Plus - Resultados Financeiros'
    }),
    new RouteModel({
        route: '/a-careplus/termos-e-condicoes',
        description: 'A Care Plus - Termos e Condições'
    }),
    new RouteModel({
        route: '/a-careplus/politica-de-privacidade',
        description: 'A Care Plus - Politica de Privacidade'
    }),
    new RouteModel({
        route: '/a-careplus/rede-plus',
        description: 'A Care Plus - Rede Plus'
    }),
    new RouteModel({
        route: '/carreiras',
        description: 'Carreiras'
    }),
    new RouteModel({
        route: '/carreiras/vagas',
        description: 'Carreiras - Vagas'
    }),
    new RouteModel({
        route: '/planos-e-produtos',
        description: 'Produtos e planos'
    }),
    new RouteModel({
        route: '/planos-e-produtos/clube-careplus',
        description: 'Produtos e planos - Clube Care Plus'
    }),
    new RouteModel({
        route: '/planos-e-produtos/careplus-soho',
        description: 'Produtos e planos - Care Plus Soho'
    }),
    new RouteModel({
        route: '/planos-e-produtos/careplus-empresarial',
        description: 'Produtos e planos - Care Plus Empresarial'
    }),
    new RouteModel({
        route: '/planos-e-produtos/medicina-ocupacional',
        description: 'Produtos e planos - Medicina Ocupacional'
    }),
    new RouteModel({
        route: '/planos-e-produtos/gestao-de-saude',
        description: 'Gestão de Saúde'
    }),
    new RouteModel({
        route: '/planos-e-produtos/gestao-de-saude/personal-system',
        description: 'Gestão de Saúde - Personal System'
    }),
    new RouteModel({
        route: '/planos-e-produtos/gestao-de-saude/programas-preventivos',
        description: 'Gestão de Saúde - Programas Preventivos'
    }),
    new RouteModel({
        route: '/planos-e-produtos/gestao-de-saude/programas-empresariais',
        description: 'Programas Empresariais - Gestão de saude'
    }),
    new RouteModel({
        route: '/planos-e-produtos/gestao-de-saude/servicos-online',
        description: 'Gestão de Saúde - Serviços On-line'
    }),
    new RouteModel({
        route: '/planos-e-produtos/gestao-de-saude/programas-empresariais',
        description: 'Gestão de Saúde - Programas Empresariais'
    }),
    new RouteModel({
        route: '/planos-e-produtos/gestao-de-saude/nossas-parcerias',
        description: 'Gestão de Saúde - Nossas Parcerias'
    }),
    new RouteModel({
        route: '/careplus-mais',
        description: 'Care Plus +'
    }),
    new RouteModel({
        route: (slug) => `/careplus-mais/${slug}`,
        description: 'Detalhes do post - Care Plus +'
    }),
];