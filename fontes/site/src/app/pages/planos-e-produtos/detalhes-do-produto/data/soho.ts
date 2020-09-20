import { IconCardModel, ButtonModel, IconCardsSectionModel, InfoSectionModel, SimpleBannerModel, BreadcrumbModel } from 'src/app/models';

export default {
    id: 'soho',
    name: 'Soho',
    simpleBannerModel: new SimpleBannerModel({
        title: 'Care Plus SoHo: planos de 2 a 29 vidas',
        description: 'O Care Plus SoHo apresenta planos para pequenas empresas, de 2 a 29 vidas e é indicado para aquelas que atuam em home office ou com operações mais enxutas.',
        image: 'assets/img/banner-clube-careplus.jpg',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home',
            }),
            new BreadcrumbModel({
                name: 'Planos e Produtos',
                link: '/planos-e-produtos',
            }),
            new BreadcrumbModel({
                name: 'Care Plus Soho',
                link: '/planos-e-produtos/soho',
                active: true
            })
        ],
        hasAnchor: true,
    }),
    aboutPlan: new InfoSectionModel({
        smallTitle: 'SOBRE O PLANO',
        bigTitle: 'Saiba mais sobre o Care Plus SoHo e como contratá-lo',
        subDescriptions: [
            'Se sua empresa possui dois titulares ou mais, com atividade ativa e comprovada por documentos contábeis e fiscais há mais de 18 (ou 24) meses, o Care Plus SoHo apresenta planos sob medida para sua empresa. Com ele, você e seus colaboradores, terão acesso ao acolhimento, cuidado e humanização que tanto merecem, juntamente com a entrega de uma ampla rede credenciada, facilidades para reembolso, atendimento personalizado e mais uma gama de serviços premium.'
        ],
        imageSrc: 'assets/img/bloco-clube-careplus.jpg',
        button: new ButtonModel({
            text: 'SOLICITE UMA COTAÇÃO',
            routerLink: '/fale-conosco',
            queryParams: {
                plano: 'soho'
            }
        }),
        parallax: true
    }),
    plansTypes: [
        {
            title: 'Planos Care Plus Soho',
            description: 'Selecione ao lado qual tipo de plano gostaria de visualizar.',
            active: true,
            id: 1,
            plans: [
                {
                    type: 'default',
                    title: 'Básico',
                    description: 'Um plano na medida certa para entregar tudo o que o seu colaborador merece.',
                    items: [
                        {
                            text: 'Cobertura completa para consultas médicas, exames, internações, dentre outros.',
                        },
                        {
                            text: 'Rede Credenciada com profissionais de saúde, laboratórios e hospitais referenciados.',
                        },
                        {
                            text: 'Reembolso com total agilidade e praticidade pelo nosso site e app.'
                        },
                        {
                            text: 'Programa de Prevenção de Doenças Cardiovasculares com equipe de saúde multidisciplinar.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Especial I',
                    description: 'O plano elaborado para as necessidades de seus colaboradores com a garantia de excelentes coberturas.',
                    items: [
                        {
                            text: 'Cobertura completa para consultas médicas, exames, internações, dentre outros.',
                        },
                        {
                            text: 'Rede Credenciada com profissionais de saúde, laboratórios e hospitais referenciados.',
                        },
                        {
                            text: 'Reembolso com total agilidade e praticidade pelo nosso site e app.'
                        },
                        {
                            text: 'Programa de Prevenção de Doenças Cardiovasculares com equipe de saúde multidisciplinar.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Especial II',
                    description: 'O plano na medida para sua empresa. Com ele, você assegurará a saúde dos colaboradores de sua empresa.',
                    items: [
                        {
                            text: 'Cobertura completa para consultas médicas, exames, internações, dentre outros.',
                        },
                        {
                            text: 'Rede Credenciada com profissionais de saúde, laboratórios e hospitais referenciados.',
                        },
                        {
                            text: 'Reembolso com total agilidade e praticidade pelo nosso site e app.'
                        },
                        {
                            text: 'Programa de Prevenção de Doenças Cardiovasculares com equipe de saúde multidisciplinar.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Executivo I',
                    description: 'Com o Executivo I, os seus colaboradores terão acesso a diferenciais exclusivos e únicos da Care Plus.',
                    items: [
                        {
                            text: 'Cobertura completa para consultas médicas, exames, internações, dentre outros.',
                        },
                        {
                            text: 'Rede Credenciada com profissionais de saúde, laboratórios e hospitais referenciados.',
                        },
                        {
                            text: 'Check-up para o titular e cônjuge garantindo a saúde do seu colaborador.'
                        },
                        {
                            text: 'Consultas domiciliares com clínico geral e pediatra na casa de nossos beneficiários.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Executivo II',
                    description: 'Um plano diferenciado para colaboradores que tem o plano de saúde como um atributo de decisão na escolha de sua empresa.',
                    items: [
                        {
                            text: 'Cobertura completa para consultas médicas, exames, internações, dentre outros.',
                        },
                        {
                            text: 'Rede Credenciada com profissionais de saúde, laboratórios e hospitais referenciados.',
                        },
                        {
                            text: 'Check-up para o titular e cônjuge garantindo a saúde do seu colaborador.'
                        },
                        {
                            text: 'Consultas domiciliares com clínico geral e pediatra na casa de nossos beneficiários.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Master I',
                    description: 'Um plano completo, com diferenciais únicos e exclusivos repleto de cuidado, acolhimento e humanização.',
                    items: [
                        {
                            text: 'Saúde em Casa: Consultas domiciliares com clínico geral e pediatra no conforto de sua casa.',
                        },
                        {
                            text: 'Assistência viagem para o exterior com cobertura de até US$ 300.000 para o beneficiário e família.',
                        },
                        {
                            text: 'Concierge: Equipe com atendimento personalizado que agenda consultas, exames, vacinas, entre outros.'
                        },
                        {
                            text: 'Telemedicina: Consultas virtuais com a equipe do Hospital Albert Einstein.'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Planos Care Plus Soho',
            description: 'Selecione ao lado qual tipo de plano gostaria de visualizar.',
            active: false,
            id: 2,
            plans: [
                {
                    type: 'default',
                    title: 'Odonto 2',
                    description: 'Um plano na medida certa para entregar tudo o que o seu colaborador merece.',
                    items: [
                        {
                            text: 'Múltiplo de Reembolso de 2x.',
                        },
                        {
                            text: 'Opção: Clínica Geral (exceto Clareamento Dentário).',
                        },
                        {
                            text: 'Opção: Ortodontia e Prótese.'
                        },
                        {
                            text: 'Rede Credenciada Odonto Executivo e Livre Escolha.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Odonto 4',
                    description: 'O plano elaborado para as necessidades de seus colaboradores com a garantia de excelentes coberturas.',
                    items: [
                        {
                            text: 'Múltiplo de Reembolso de 4x.',
                        },
                        {
                            text: 'Opção: Clínica Geral (inclusive Clareamento Dentário).',
                        },
                        {
                            text: 'Opção: Ortodontia, Prótese e Implante.'
                        },
                        {
                            text: 'Rede Credenciada Odonto Executivo e Livre Escolha.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Odonto 7',
                    description: 'O plano na medida para sua empresa. Com ele, você assegurará a saúde dos colaboradores de sua empresa.',
                    items: [
                        {
                            text: 'Múltiplo de Reembolso de 7x.',
                        },
                        {
                            text: 'Opção: Clínica Geral (inclusive Clareamento Dentário).',
                        },
                        {
                            text: 'Opção: Ortodontia, Prótese e Implante.'
                        },
                        {
                            text: 'Rede Credenciada Odonto Executivo e Livre Escolha.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Odonto 10',
                    description: 'Com o Odonto 10, os seus colaboradores terão acesso a diferenciais exclusivos e únicos da Care Plus.',
                    items: [
                        {
                            text: 'Múltiplo de Reembolso de 10x.',
                        },
                        {
                            text: 'Opção: Clínica Geral (inclusive Clareamento Dentário).',
                        },
                        {
                            text: 'Opção: Ortodontia, Prótese e Implante.'
                        },
                        {
                            text: 'Rede Credenciada Odonto Master, Livre Escolha e Care Plus Clinic.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Odonto 15',
                    description: 'Um plano diferenciado para colaboradores que tem o plano de saúde como um atributo de decisão na escolha de sua empresa.',
                    items: [
                        {
                            text: 'Múltiplo de Reembolso de 15x.',
                        },
                        {
                            text: 'Opção: Clínica Geral (inclusive Clareamento Dentário).',
                        },
                        {
                            text: 'Opção: Ortodontia, Prótese e Implante.'
                        },
                        {
                            text: 'Rede Credenciada Odonto Master, Livre Escolha e Care Plus Clinic.'
                        }
                    ]
                },
                {
                    type: 'default',
                    title: 'Odonto 20',
                    description: 'Um plano completo, com diferenciais únicos e exclusivos repleto de cuidado, acolhimento e humanização.',
                    items: [
                        {
                            text: 'Múltiplo de Reembolso de 20x.',
                        },
                        {
                            text: 'Opção: Clínica Geral (inclusive Clareamento Dentário).',
                        },
                        {
                            text: 'Opção: Ortodontia, Prótese e Implante.'
                        },
                        {
                            text: 'Rede Credenciada Odonto Master, Livre Escolha e Care Plus Clinic.'
                        }
                    ]
                }
            ]
        }
    ],
    dentalSection: new InfoSectionModel({
        smallTitle: 'ODONTOLÓGICO',
        bigTitle: 'Saiba como funcionam os Planos Odontológicos',
        description: 'Temos planos odontológicos que se encaixam nas necessidades de sua empresa',
        subDescription: 'Nossos planos odontológicos também fazem parte das classificações: Care Plus Soho, Clube Care Plus e Care Plus Empresarial, e se ajustam a todo e qualquer tamanho de empresa.',
        imageSrc: 'assets/img/bloco-plano-odontologico.jpg',
        button: new ButtonModel({
            text: 'SOLICITE UMA COTAÇÃO',
            routerLink: '/fale-conosco',
            queryParams: {
                plano: 'soho',
                planoOdontologico: true
            }
        })
    }),
    hospitalListSection: {
        smallTitle: 'Rede Credenciada Planos - Care Plus SoHo',
        bigTitle: 'Conheça todos os hospitais e laboratórios disponíveis para os Planos – Care Plus SoHo'
    },
    plansSection: new InfoSectionModel({
        smallTitle: 'PLANOS',
        bigTitle: 'Esse plano não atende o tamanho da sua empresa? Conheça os demais',
        description: 'Temos Planos para o tamanho exato de sua empresa.',
        subDescription: 'Temos planos para empresas de 2 a 29 vidas, de 30 a 200 vidas ou de mais de 200 vidas. Acesse nossa página de Planos e Produtos e conheça todos.',
        imageSrc: 'assets/svg/plans-section-illustation.svg',
        button: new ButtonModel({
            text: 'VER TODOS OS PLANOS',
            routerLink: '/planos-e-produtos'
        }),
        reverse: true,
        removeLine: true
    }),
    iconCardsSectionModel: new IconCardsSectionModel({
        smallTitle: 'GESTÃO DE SAÚDE',
        bigTitle: 'Programas e serviços exclusivos: a melhor experiência em Gestão de Saúde',
        subDescription: 'Mais do que cuidado, proporcionamos facilidade e comodidade para todos os nossos beneficiários e empresas.',
        button: new ButtonModel({
            text: 'CONHEÇA NOSSOS PROGRAMAS',
            routerLink: '/gestao-de-saude'
        }),
        cards: [
            new IconCardModel({
                "type": "icon",
                "title": "Programas Preventivos",
                "description": "A Care Plus oferece diversos programas preventivos de saúde e acompanhamento, uma vida saudável.",
                "imagePath": "assets/svg/shield.svg",
                "routerLink": "/gestao-de-saude/programas-preventivos"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Serviços Online",
                "description": "Os beneficiários podem aproveitar alguns serviços a distância com a qualidade, o carinho e o cuidado que só a Care Plus tem.",
                "imagePath": "assets/svg/monitor-screen.svg",
                "backgroundColorClass": "white-background-color",
                "routerLink": "/gestao-de-saude/servicos-online"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Personal System",
                "description": "A Care Plus oferece consultas em clínicas próprias com médicos, nutricionistas e psicólogos. Conheça os programas.",
                "imagePath": "assets/svg/doctor.svg",
                "routerLink": "/gestao-de-saude/personal-system"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Programas Empresariais",
                "description": "A Care Plus disponibiliza  médicos, nutricionistas, enfermeiras e psicólogos para realizar atendimento no ambiente das empresas.",
                "imagePath": "assets/svg/doctorphone.svg",
                "routerLink": "/gestao-de-saude/programas-empresariais"
            })
        ],
        columnClass: 'is-3-desktop'
    }),
    clinicSection: new InfoSectionModel({
        smallTitle: 'CLÍNICAS',
        bigTitle: 'Care Plus Clinic',
        subDescriptions: [
            'As clínicas Care Plus Clinic foram desenvolvidas para oferecer aos nossos pacientes serviços de saúde com excelência técnica, conforto e qualidade excepcional de atendimento.',
            'Elas contam com o que há de mais moderno e eficiente, obedecendo ao mais alto grau de exigência para estabelecimentos de saúde determinado pela ANVISA, que assegura os mais rígidos padrões de qualidade e excelência.',
            'Temos clínicas na Vila Olímpia e Brooklin, em São Paulo e no Barra Sul Shopping, no Rio de Janeiro.',
        ],
        imageSrc: 'assets/img/bloco-clinicas.jpg',
        reverse: true,
    }),
    clinicInfos: {
        bigTitle: 'Veja algumas das especialidades e tratamentos das nossas clínicas',
        items: [
            {
                text: 'Clínica Geral e Pediatria.',
            },
            {
                text: 'Invisalign.'
            },
            {
                text: 'Ortodontia.'
            },
            {
                text: 'Implantodontia.'
            }
        ],
    },
    travelSection: new InfoSectionModel({
        smallTitle: 'CARE PLUS TRAVEL',
        bigTitle: 'Vai viajar para o exterior? Conte com o nosso serviço de assistência viagem',
        description: 'Com o Care Plus Travel você conta com uma cobertura internacional de até US$ 300.000,00',
        subDescription: 'Desbrave o mundo sem preocupação. Garantimos segurança e saúde para você e sua família curtirem a viagem com tranquilidade. Entre em contato com o gestor do seu plano para contratar esse benefício.',
        imageSrc: 'assets/img/plane.jpg',
    }),
    secondCard: new IconCardModel({
        title: 'Solicite uma Cotação',
        type: 'icon',
        button: new ButtonModel({
            routerLink: '/fale-conosco',
            text: 'Clique e solicite cotação',
            queryParams: {
                plano: 'soho'
            }
        }),
        imagePath: 'assets/svg/calendar.svg'
    })
};