import { SubMenu, SubMenuItem } from 'src/app/models';

export default [
    new SubMenu({
        id: 'default',
        items: [
            new SubMenuItem({
                title: 'A Care Plus',
                routerLink: '/a-careplus',
                subItems: [
                    new SubMenuItem({
                        title: 'A Empresa',
                        routerLink: '/a-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Diferenciais',
                        routerLink: '/a-careplus/diferenciais'
                    }),
                    new SubMenuItem({
                        title: 'Responsabilidade Social',
                        routerLink: '/a-careplus/responsabilidade-social'
                    }),
                    new SubMenuItem({
                        title: 'Rede Plus',
                        routerLink: '/a-careplus/rede-plus'
                    }),
                    new SubMenuItem({
                        title: 'Perguntas Frequentes',
                        routerLink: '/a-careplus/faq'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    }),
                    new SubMenuItem({
                        title: 'Materiais',
                        routerLink: '/a-careplus/materiais'
                    }),
                    new SubMenuItem({
                        title: 'Termos e Condições',
                        routerLink: '/a-careplus/termos-e-condicoes'
                    }),
                    new SubMenuItem({
                        title: 'Política de Privacidade',
                        routerLink: '/a-careplus/politica-de-privacidade'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Planos',
                routerLink: '/planos-e-produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Care Plus SoHo (de 2 a 29 vidas)',
                        routerLink: '/planos-e-produtos/soho'
                    }),
                    new SubMenuItem({
                        title: 'Clube Care Plus (de 30 a 200 vidas)',
                        routerLink: '/planos-e-produtos/clube-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Empresarial (mais de 200 vidas)',
                        routerLink: '/planos-e-produtos/empresarial'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Produtos',
                routerLink: '/planos-e-produtos',
                fragment: 'produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Medicina Ocupacional',
                        routerLink: '/planos-e-produtos/medicina-ocupacional'
                    }),
                    new SubMenuItem({
                        title: 'Gestão de saúde',
                        routerLink: '/gestao-de-saude'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Carreiras',
                routerLink: '/carreiras',
                subItems: [
                    new SubMenuItem({
                        title: 'Carreiras',
                        routerLink: '/carreiras',
                    }),
                    new SubMenuItem({
                        title: 'Vagas',
                        routerLink: '/carreiras/vagas',
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Care plus+',
                routerLink: '/careplus-mais',
            }),
            new SubMenuItem({
                title: 'Fale Conosco',
                routerLink: '/fale-conosco',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite Uma Cotação',
                        routerLink: '/fale-conosco',
                    }),
                    new SubMenuItem({
                        title: 'Fale Conosco',
                        routerLink: '/fale-conosco/fale-conosco',
                    }),
                    new SubMenuItem({
                        title: 'Canal De Denúncias',
                        routerLink: '/fale-conosco/canal-de-denuncias',
                    }),
                    new SubMenuItem({
                        title: 'Ouvidoria',
                        routerLink: '/fale-conosco/ouvidoria',
                    }),
                ]
            }),
        ]
    }),
    new SubMenu({
        id: 'beneficiario',
        items: [
            new SubMenuItem({
                title: 'A Care Plus',
                routerLink: '/a-careplus',
                subItems: [
                    new SubMenuItem({
                        title: 'A Empresa',
                        routerLink: '/a-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Diferenciais',
                        routerLink: '/a-careplus/diferenciais'
                    }),
                    new SubMenuItem({
                        title: 'Responsabilidade Social',
                        routerLink: '/a-careplus/responsabilidade-social'
                    }),
                    new SubMenuItem({
                        title: 'Rede Plus',
                        routerLink: '/a-careplus/rede-plus'
                    }),
                    new SubMenuItem({
                        title: 'Perguntas Frequentes',
                        routerLink: '/a-careplus/faq'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    }),
                    new SubMenuItem({
                        title: 'Materiais',
                        routerLink: '/a-careplus/materiais'
                    }),
                    new SubMenuItem({
                        title: 'Termos e Condições',
                        routerLink: '/a-careplus/termos-e-condicoes'
                    }),
                    new SubMenuItem({
                        title: 'Política de Privacidade',
                        routerLink: '/a-careplus/politica-de-privacidade'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Consulta Fácil',
                routerLink: '/a-careplus/diferenciais/consulta-facil',
            }),
            new SubMenuItem({
                title: 'Gestão De Saúde',
                routerLink: '/gestao-de-saude',
                subItems: [
                    new SubMenuItem({
                        title: 'Programas Preventivos',
                        routerLink: '/gestao-de-saude/programas-preventivos'
                    }),
                    new SubMenuItem({
                        title: 'Serviços Online',
                        routerLink: '/gestao-de-saude/servicos-online'
                    }),
                    new SubMenuItem({
                        title: 'Personal System',
                        routerLink: '/gestao-de-saude/personal-system'
                    }),
                    new SubMenuItem({
                        title: 'Programas Empresariais',
                        routerLink: '/gestao-de-saude/programas-empresariais'
                    }),
                    new SubMenuItem({
                        title: 'Nossas parcerias',
                        routerLink: '/gestao-de-saude/nossas-parcerias'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Care plus+',
                routerLink: '/careplus-mais',
            }),
            new SubMenuItem({
                title: 'Fale Conosco',
                routerLink: '/fale-conosco',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite Uma Cotação',
                        routerLink: '/fale-conosco',
                    }),
                    new SubMenuItem({
                        title: 'Fale Conosco',
                        routerLink: '/fale-conosco/fale-conosco',
                    }),
                    new SubMenuItem({
                        title: 'Canal De Denúncias',
                        routerLink: '/fale-conosco/canal-de-denuncias',
                    }),
                    new SubMenuItem({
                        title: 'Ouvidoria',
                        routerLink: '/fale-conosco/ouvidoria',
                    }),
                ]
            }),
        ]
    }),
    new SubMenu({
        id: 'rh/corretor',
        items: [
            new SubMenuItem({
                title: 'A Care Plus',
                routerLink: '/a-careplus',
                subItems: [
                    new SubMenuItem({
                        title: 'A Empresa',
                        routerLink: '/a-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Diferenciais',
                        routerLink: '/a-careplus/diferenciais'
                    }),
                    new SubMenuItem({
                        title: 'Responsabilidade Social',
                        routerLink: '/a-careplus/responsabilidade-social'
                    }),
                    new SubMenuItem({
                        title: 'Rede Plus',
                        routerLink: '/a-careplus/rede-plus'
                    }),
                    new SubMenuItem({
                        title: 'Perguntas Frequentes',
                        routerLink: '/a-careplus/faq'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    }),
                    new SubMenuItem({
                        title: 'Materiais',
                        routerLink: '/a-careplus/materiais'
                    }),
                    new SubMenuItem({
                        title: 'Termos e Condições',
                        routerLink: '/a-careplus/termos-e-condicoes'
                    }),
                    new SubMenuItem({
                        title: 'Política de Privacidade',
                        routerLink: '/a-careplus/politica-de-privacidade'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Planos',
                routerLink: '/planos-e-produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Care Plus SoHo (de 2 a 29 vidas)',
                        routerLink: '/planos-e-produtos/soho'
                    }),
                    new SubMenuItem({
                        title: 'Clube Care Plus (de 30 a 200 vidas)',
                        routerLink: '/planos-e-produtos/clube-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Empresarial (mais de 200 vidas)',
                        routerLink: '/planos-e-produtos/empresarial'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Produtos',
                routerLink: '/planos-e-produtos',
                fragment: 'produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Medicina Ocupacional',
                        routerLink: '/planos-e-produtos/medicina-ocupacional'
                    }),
                    new SubMenuItem({
                        title: 'Gestão de saúde',
                        routerLink: '/gestao-de-saude'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Rede Plus',
                routerLink: '/a-careplus/rede-plus'
            }),
            new SubMenuItem({
                title: 'Carreiras',
                routerLink: '/carreiras',
                subItems: [
                    new SubMenuItem({
                        title: 'Carreiras',
                        routerLink: '/carreiras',
                    }),
                    new SubMenuItem({
                        title: 'Vagas',
                        routerLink: '/carreiras/vagas',
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Care plus+',
                routerLink: '/careplus-mais',
            }),
            new SubMenuItem({
                title: 'Fale Conosco',
                routerLink: '/fale-conosco',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite Uma Cotação',
                        routerLink: '/fale-conosco',
                    }),
                    new SubMenuItem({
                        title: 'Fale Conosco',
                        routerLink: '/fale-conosco/fale-conosco',
                    }),
                    new SubMenuItem({
                        title: 'Canal De Denúncias',
                        routerLink: '/fale-conosco/canal-de-denuncias',
                    }),
                    new SubMenuItem({
                        title: 'Ouvidoria',
                        routerLink: '/fale-conosco/ouvidoria',
                    }),
                ]
            }),
        ]
    }),
]