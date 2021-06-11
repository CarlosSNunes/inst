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
        description: 'Fale Conosco - Solicite uma Cotação'
    }),
    new RouteModel({
        route: '/fale-conosco/solicite-uma-cotacao',
        description: 'Fale Conosco - Solicite uma Cotação'
    }),
    new RouteModel({
        route: '/fale-conosco/contato',
        description: 'Fale Conosco - Contato'
    }),
    new RouteModel({
        route: '/fale-conosco/ouvidoria',
        description: 'Fale Conosco - Ouvidoria'
    }),
    new RouteModel({
        route: '/fale-conosco/canal-de-denuncias',
        description: 'Fale Conosco - Canal de Denúncias'
    }),
    new RouteModel({
        route: '/a-careplus',
        description: 'A Care Plus - A Empresa'
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
        description: 'Planos e Produtos'
    }),
    new RouteModel({
        route: '/planos-e-produtos/clube-careplus',
        description: 'Planos e Produtos - Clube Care Plus'
    }),
    new RouteModel({
        route: '/planos-e-produtos/careplus-soho',
        description: 'Planos e Produtos - Care Plus Soho'
    }),
    new RouteModel({
        route: '/planos-e-produtos/careplus-empresarial',
        description: 'Planos e Produtos - Care Plus Empresarial'
    }),
    new RouteModel({
        route: '/planos-e-produtos/medicina-ocupacional',
        description: 'Planos e Produtos - Medicina Ocupacional'
    }),
    new RouteModel({
        route: '/a-careplus/gestao-de-saude',
        description: 'Gestão de Saúde'
    }),
    new RouteModel({
        route: '/a-careplus/gestao-de-saude/personal-system',
        description: 'Gestão de Saúde - Personal System'
    }),
    new RouteModel({
        route: '/a-careplus/gestao-de-saude/programas-preventivos',
        description: 'Gestão de Saúde - Programas Preventivos'
    }),
    new RouteModel({
        route: '/a-careplus/gestao-de-saude/servicos-online',
        description: 'Gestão de Saúde - Serviços On-line'
    }),
    new RouteModel({
        route: '/a-careplus/gestao-de-saude/programas-empresariais',
        description: 'Gestão de Saúde - Programas Empresariais'
    }),
    new RouteModel({
        route: '/a-careplus/gestao-de-saude/nossas-parcerias',
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
    new RouteModel({
        route: '/sitemap',
        description: 'Sitemap'
    }),
];