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
                        title: 'Rede Plus',
                        routerLink: '/a-careplus/rede-plus'
                    }),
                    new SubMenuItem({
                        title: 'Gestão de Saúde',
                        routerLink: '/a-careplus/gestao-de-saude'
                    }),
                    new SubMenuItem({
                        title: 'Responsabilidade Social',
                        routerLink: '/a-careplus/responsabilidade-social'
                    }),
                    new SubMenuItem({
                        title: 'Perguntas Frequentes',
                        routerLink: '/a-careplus/perguntas-frequentes'
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
                        title: 'Aviso de Privacidade',
                        routerLink: '/a-careplus/politica-de-privacidade'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    })
                ]
            }),
            new SubMenuItem({
                title: 'Planos e Produtos',
                routerLink: '/planos-e-produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Care Plus Saúde',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Dental',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Ocupacional',
                        routerLink: '/planos-e-produtos/medicina-ocupacional'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'https://www.masterinternational.com.br/',
                        target: '_blank'
                    })
                ]
            }),
            new SubMenuItem({
                title: 'Care Plus Store',
                routerLink: '/',
                subItems: [
                    new SubMenuItem({
                        title: 'Loja Care Plus',
                        href: 'https://store.careplus.com.br/'
                    })
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
                title: 'Care Plus +',
                routerLink: '/careplus-mais',
            }),
            new SubMenuItem({
                title: 'Fale Conosco',
                routerLink: '/fale-conosco',
                subItems: [
                    new SubMenuItem({
                        title: 'Solicite uma Cotação',
                        routerLink: '/fale-conosco/solicite-uma-cotacao',
                    }),
                    new SubMenuItem({
                        title: 'Contato',
                        routerLink: '/fale-conosco/contato',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        routerLink: '/fale-conosco/canal-de-denuncias',
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
                        title: 'Rede Plus',
                        routerLink: '/a-careplus/rede-plus'
                    }),
                    new SubMenuItem({
                        title: 'Gestão de Saúde',
                        routerLink: '/a-careplus/gestao-de-saude'
                    }),
                    new SubMenuItem({
                        title: 'Responsabilidade Social',
                        routerLink: '/a-careplus/responsabilidade-social'
                    }),
                    new SubMenuItem({
                        title: 'Perguntas Frequentes',
                        routerLink: '/a-careplus/perguntas-frequentes'
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
                        title: 'Aviso de Privacidade',
                        routerLink: '/a-careplus/politica-de-privacidade'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    })
                ]
            }),
            new SubMenuItem({
                title: 'Planos e Produtos',
                routerLink: '/planos-e-produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Care Plus Saúde',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Dental',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Ocupacional',
                        routerLink: '/planos-e-produtos/medicina-ocupacional'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'https://www.masterinternational.com.br/',
                        target: '_blank'
                    })
                ]
            }),           
            new SubMenuItem({
                title: 'Rede Plus',
                routerLink: '/a-careplus/rede-plus'
            }),
            new SubMenuItem({
                title: 'Gestão de Saúde',
                routerLink: '/a-careplus/gestao-de-saude',
                subItems: [
                    new SubMenuItem({
                        title: 'Programas Preventivos',
                        routerLink: '/a-careplus/gestao-de-saude/programas-preventivos'
                    }),
                    new SubMenuItem({
                        title: 'Serviços On-line',
                        routerLink: '/a-careplus/gestao-de-saude/servicos-online'
                    }),
                    new SubMenuItem({
                        title: 'Personal System',
                        routerLink: '/a-careplus/gestao-de-saude/personal-system'
                    }),
                    new SubMenuItem({
                        title: 'Programas Empresariais',
                        routerLink: '/a-careplus/gestao-de-saude/programas-empresariais'
                    }),
                    new SubMenuItem({
                        title: 'Nossas Parcerias',
                        routerLink: '/a-careplus/gestao-de-saude/nossas-parcerias'
                    }),
                ]
            }),
            new SubMenuItem({
                title: 'Care Plus +',
                routerLink: '/careplus-mais',
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
                        routerLink: '/fale-conosco/contato',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        routerLink: '/fale-conosco/canal-de-denuncias',
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
                        title: 'Rede Plus',
                        routerLink: '/a-careplus/rede-plus'
                    }),
                    new SubMenuItem({
                        title: 'Gestão de Saúde',
                        routerLink: '/a-careplus/gestao-de-saude'
                    }),
                    new SubMenuItem({
                        title: 'Responsabilidade Social',
                        routerLink: '/a-careplus/responsabilidade-social'
                    }),
                    new SubMenuItem({
                        title: 'Perguntas Frequentes',
                        routerLink: '/a-careplus/perguntas-frequentes'
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
                        title: 'Aviso de Privacidade',
                        routerLink: '/a-careplus/politica-de-privacidade'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    })
                ]
            }),
            new SubMenuItem({
                title: 'Planos e Produtos',
                routerLink: '/planos-e-produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Care Plus Saúde',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Dental',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Ocupacional',
                        routerLink: '/planos-e-produtos/medicina-ocupacional'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'https://www.masterinternational.com.br/',
                        target: '_blank'
                    })
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
                title: 'Care Plus +',
                routerLink: '/careplus-mais',
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
                        routerLink: '/fale-conosco/contato',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        routerLink: '/fale-conosco/canal-de-denuncias',
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
                        title: 'Rede Plus',
                        routerLink: '/a-careplus/rede-plus'
                    }),
                    new SubMenuItem({
                        title: 'Gestão de Saúde',
                        routerLink: '/a-careplus/gestao-de-saude'
                    }),
                    new SubMenuItem({
                        title: 'Responsabilidade Social',
                        routerLink: '/a-careplus/responsabilidade-social'
                    }),
                    new SubMenuItem({
                        title: 'Perguntas Frequentes',
                        routerLink: '/a-careplus/perguntas-frequentes'
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
                        title: 'Aviso de Privacidade',
                        routerLink: '/a-careplus/politica-de-privacidade'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    })
                ]
            }),
            new SubMenuItem({
                title: 'Planos e Produtos',
                routerLink: '/planos-e-produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Care Plus Saúde',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Dental',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Ocupacional',
                        routerLink: '/planos-e-produtos/medicina-ocupacional'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'https://www.masterinternational.com.br/',
                        target: '_blank'
                    })
                ]
            }),
            new SubMenuItem({
                title: 'Care Plus Store',
                routerLink: '/',
                subItems: [
                    new SubMenuItem({
                        title: 'Loja Care Plus',
                        href: 'https://store.careplus.com.br/'
                    })
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
                        routerLink: '/fale-conosco/contato',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        routerLink: '/fale-conosco/canal-de-denuncias',
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
                        title: 'Rede Plus',
                        routerLink: '/a-careplus/rede-plus'
                    }),
                    new SubMenuItem({
                        title: 'Gestão de Saúde',
                        routerLink: '/a-careplus/gestao-de-saude'
                    }),
                    new SubMenuItem({
                        title: 'Responsabilidade Social',
                        routerLink: '/a-careplus/responsabilidade-social'
                    }),
                    new SubMenuItem({
                        title: 'Perguntas Frequentes',
                        routerLink: '/a-careplus/perguntas-frequentes'
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
                        title: 'Aviso de Privacidade',
                        routerLink: '/a-careplus/politica-de-privacidade'
                    }),
                    new SubMenuItem({
                        title: 'Resultados Financeiros',
                        routerLink: '/a-careplus/resultados-financeiros'
                    })
                ]
            }),
            new SubMenuItem({
                title: 'Planos e Produtos',
                routerLink: '/planos-e-produtos',
                subItems: [
                    new SubMenuItem({
                        title: 'Care Plus Saúde',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Dental',
                        routerLink: '/planos-e-produtos',
                        fragment:'planos'
                    }),
                    new SubMenuItem({
                        title: 'Care Plus Ocupacional',
                        routerLink: '/planos-e-produtos/medicina-ocupacional'
                    }),
                    new SubMenuItem({
                        title: 'Master International',
                        href: 'https://www.masterinternational.com.br/',
                        target: '_blank'
                    })
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
                title: 'Care Plus +',
                routerLink: '/careplus-mais',
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
                        routerLink: '/fale-conosco/contato',
                    }),
                    new SubMenuItem({
                        title: 'Canal de Denúncias',
                        routerLink: '/fale-conosco/canal-de-denuncias',
                    }),
                ]
            }),
        ]
    }),
]
