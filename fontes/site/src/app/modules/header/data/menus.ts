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
                        routerLink: '/a-careplus/perguntas-frequentes'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    }),
                    new SubMenuItem({
                        title: 'Materiais de Saúde',
                        routerLink: '/a-careplus/materiais-de-saude'
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
                        routerLink: '/planos-e-produtos/careplus-soho'
                    }),
                    new SubMenuItem({
                        title: 'Clube Care Plus (de 30 a 200 vidas)',
                        routerLink: '/planos-e-produtos/clube-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Empresarial (mais de 200 vidas)',
                        routerLink: '/planos-e-produtos/careplus-empresarial'
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
                        title: 'Gestão de Saúde',
                        routerLink: '/planos-e-produtos/gestao-de-saude'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'http://www.masterinternational.com.br/',
                        target: '_blank'
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
                title: 'Fale Conosco',
                routerLink: '/fale-conosco/solicite-uma-cotacao',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite uma Cotação',
                        routerLink: '/fale-conosco/solicite-uma-cotacao',
                    }),
                    new SubMenuItem({
                        title: 'Contato',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaContato.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/home/canalDenuncias.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Ouvidoria',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaOuvidoria.aspx',
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
                        routerLink: '/a-careplus/perguntas-frequentes'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    }),
                    new SubMenuItem({
                        title: 'Materiais de Saúde',
                        routerLink: '/a-careplus/materiais-de-saude'
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
                        routerLink: '/planos-e-produtos/careplus-soho'
                    }),
                    new SubMenuItem({
                        title: 'Clube Care Plus (de 30 a 200 vidas)',
                        routerLink: '/planos-e-produtos/clube-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Empresarial (mais de 200 vidas)',
                        routerLink: '/planos-e-produtos/careplus-empresarial'
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
                        title: 'Gestão de Saúde',
                        routerLink: '/planos-e-produtos/gestao-de-saude'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'http://www.masterinternational.com.br/',
                        target: '_blank'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Rede Plus',
                routerLink: '/a-careplus/rede-plus'
            }),
            new SubMenuItem({
                title: 'Gestão de Saúde',
                routerLink: '/planos-e-produtos/gestao-de-saude',
                subItems: [
                    new SubMenuItem({
                        title: 'Programas Preventivos',
                        routerLink: '/planos-e-produtos/gestao-de-saude/programas-preventivos'
                    }),
                    new SubMenuItem({
                        title: 'Serviços On-line',
                        routerLink: '/planos-e-produtos/gestao-de-saude/servicos-online'
                    }),
                    new SubMenuItem({
                        title: 'Personal System',
                        routerLink: '/planos-e-produtos/gestao-de-saude/personal-system'
                    }),
                    new SubMenuItem({
                        title: 'Programas Empresariais',
                        routerLink: '/planos-e-produtos/gestao-de-saude/programas-empresariais'
                    }),
                    new SubMenuItem({
                        title: 'Nossas Parcerias',
                        routerLink: '/planos-e-produtos/gestao-de-saude/nossas-parcerias'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Fale Conosco',
                routerLink: '/fale-conosco/solicite-uma-cotacao',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite uma Cotação',
                        routerLink: '/fale-conosco/solicite-uma-cotacao',
                    }),
                    new SubMenuItem({
                        title: 'Contato',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaContato.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/home/canalDenuncias.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Ouvidoria',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaOuvidoria.aspx',
                    }),
                ]
            }),
        ]
    }),
    new SubMenu({
        id: 'rh',
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
                        routerLink: '/a-careplus/perguntas-frequentes'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    }),
                    new SubMenuItem({
                        title: 'Materiais de Saúde',
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
                        routerLink: '/planos-e-produtos/careplus-soho'
                    }),
                    new SubMenuItem({
                        title: 'Clube Care Plus (de 30 a 200 vidas)',
                        routerLink: '/planos-e-produtos/clube-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Empresarial (mais de 200 vidas)',
                        routerLink: '/planos-e-produtos/careplus-empresarial'
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
                        title: 'Gestão de Saúde',
                        routerLink: '/planos-e-produtos/gestao-de-saude'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'http://www.masterinternational.com.br/',
                        target: '_blank'
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
                title: 'Fale Conosco',
                routerLink: '/fale-conosco/solicite-uma-cotacao',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite uma Cotação',
                        routerLink: '/fale-conosco/solicite-uma-cotacao',
                    }),
                    new SubMenuItem({
                        title: 'Contato',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaContato.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/home/canalDenuncias.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Ouvidoria',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaOuvidoria.aspx',
                    }),
                ]
            }),
        ]
    }),
    new SubMenu({
        id: 'corretor',
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
                        routerLink: '/a-careplus/perguntas-frequentes'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    }),
                    new SubMenuItem({
                        title: 'Materiais de Saúde',
                        routerLink: '/a-careplus/materiais-de-saude'
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
                        routerLink: '/planos-e-produtos/careplus-soho'
                    }),
                    new SubMenuItem({
                        title: 'Clube Care Plus (de 30 a 200 vidas)',
                        routerLink: '/planos-e-produtos/clube-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Empresarial (mais de 200 vidas)',
                        routerLink: '/planos-e-produtos/careplus-empresarial'
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
                        title: 'Gestão de Saúde',
                        routerLink: '/planos-e-produtos/gestao-de-saude'
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
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'http://www.masterinternational.com.br/',
                        target: '_blank'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Fale Conosco',
                routerLink: '/fale-conosco/solicite-uma-cotacao',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite uma Cotação',
                        routerLink: '/fale-conosco/solicite-uma-cotacao',
                    }),
                    new SubMenuItem({
                        title: 'Contato',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaContato.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/home/canalDenuncias.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Ouvidoria',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaOuvidoria.aspx',
                    }),
                ]
            }),
        ]
    }),
    new SubMenu({
        id: 'credenciado',
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
                        routerLink: '/a-careplus/perguntas-frequentes'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    }),
                    new SubMenuItem({
                        title: 'Materiais de Saúde',
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
                        routerLink: '/planos-e-produtos/careplus-soho'
                    }),
                    new SubMenuItem({
                        title: 'Clube Care Plus (de 30 a 200 vidas)',
                        routerLink: '/planos-e-produtos/clube-careplus'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Empresarial (mais de 200 vidas)',
                        routerLink: '/planos-e-produtos/careplus-empresarial'
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
                        title: 'Gestão de Saúde',
                        routerLink: '/planos-e-produtos/gestao-de-saude/'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'http://www.masterinternational.com.br/',
                        target: '_blank'
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
                title: 'Fale Conosco',
                routerLink: '/fale-conosco/solicite-uma-cotacao',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite uma Cotação',
                        routerLink: '/fale-conosco/solicite-uma-cotacao',
                    }),
                    new SubMenuItem({
                        title: 'Contato',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaContato.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/home/canalDenuncias.aspx',
                    }),
                    new SubMenuItem({
                        title: 'Ouvidoria',
                        href: 'https://www8.careplus.com.br/portal/portal/modulos/atendimento/inclusaoDemandaOuvidoria.aspx',
                    }),
                ]
            }),
        ]
    }),
]
