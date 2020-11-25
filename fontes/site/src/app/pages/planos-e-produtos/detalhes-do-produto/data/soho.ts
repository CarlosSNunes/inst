import { IconCardModel, ButtonModel, IconCardsSectionModel, InfoSectionModel, SimpleBannerModel, BreadcrumbModel, HospitalList, Hospital } from 'src/app/models'; export default {
    id: 'careplus-soho',
    name: 'Care Plus Soho',
    title: 'Care Plus SoHo | De 2 a 29 Vidas | Planos de Saúde e Odontológicos Premium | Care Plus',
    description: 'O Care Plus SoHo apresenta planos de saúde e odontológicos premium para empresas de 2 a 29 vidas e que atuam em home office ou com operações mais enxutas.',
    simpleBannerModel: new SimpleBannerModel({
        title: 'Care Plus SoHo: planos de 2 a 29 vidas',
        description: 'O Care Plus SoHo apresenta planos para pequenas empresas, de 2 a 29 vidas e é indicado para aquelas que atuam em home office ou com operações mais enxutas.',
        image: 'assets/img/banner_plano_soho.png',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/',
            }),
            new BreadcrumbModel({
                name: 'Planos e Produtos',
                link: '/planos-e-produtos',
            }),
            new BreadcrumbModel({
                name: 'Care Plus Soho',
                link: '/planos-e-produtos/careplus-soho',
                active: true
            })
        ],
        hasAnchor: true,
    }),
    aboutPlan: new InfoSectionModel({
        smallTitle: 'SOBRE O PLANO',
        bigTitle: 'Saiba mais sobre o Care Plus SoHo e como contratá-lo',
        subDescriptions: [
            'Se sua empresa possui dois titulares ou mais, com atividade ativa e comprovada por documentos contábeis e fiscais com mínimo de 12 meses, o Care Plus SoHo apresenta planos sob medida para sua empresa. Com ele, você e seus colaboradores, terão acesso ao acolhimento, cuidado e humanização que tanto merecem, juntamente com a entrega de uma ampla rede credenciada, facilidades para reembolso, atendimento personalizado e mais uma gama de serviços premium.'
        ],
        imageSrc: 'assets/img/sobre_plano_soho.png',
        button: new ButtonModel({
            text: 'Solicite uma Cotação',
            routerLink: '/fale-conosco/solicite-uma-cotacao',
            queryParams: {
                plano: 'careplus-soho',
                planoSaude:true
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
                    title: 'Especial III',
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
                            text: 'Rede Credenciada Odonto Especial e Livre Escolha.'
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
            text: 'Solicite uma Cotação',
            routerLink: '/fale-conosco/solicite-uma-cotacao',
            queryParams: {
                plano: 'careplus-soho',
                planoOdontologico:true
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
            text: 'Ver todos os Planos',
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
            text: 'Conheça o Gestão de Saúde',
            routerLink: '/planos-e-produtos/gestao-de-saude'
        }),
        cards: [
            new IconCardModel({
                "type": "icon",
                "title": "Programas Preventivos",
                "description": "A Care Plus oferece diversos programas preventivos de saúde e acompanhamento, uma vida saudável.",
                "imagePath": "assets/svg/shield.svg",
                "routerLink": "/planos-e-produtos/gestao-de-saude/programas-preventivos"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Serviços On-line",
                "description": "Os beneficiários podem aproveitar alguns serviços a distância com a qualidade, o carinho e o cuidado que só a Care Plus tem.",
                "imagePath": "assets/svg/monitor-screen.svg",
                "backgroundColorClass": "white-background-color",
                "routerLink": "/planos-e-produtos/gestao-de-saude/servicos-online"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Personal System",
                "description": "A Care Plus oferece consultas em clínicas próprias com médicos, nutricionistas e psicólogos. Conheça os programas.",
                "imagePath": "assets/svg/doctor.svg",
                "routerLink": "/planos-e-produtos/gestao-de-saude/personal-system"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Programas Empresariais",
                "description": "A Care Plus disponibiliza  médicos, nutricionistas, enfermeiras e psicólogos para realizar atendimento no ambiente das empresas.",
                "imagePath": "assets/svg/doctorphone.svg",
                "routerLink": "/planos-e-produtos/gestao-de-saude/programas-empresariais"
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
        button: new ButtonModel({
            text: 'Conheça a Care Plus Clinic',
            link: 'https://careplusclinic.com.br'
        }),
        imageSrc: 'assets/img/bloco-clinicas.jpg',
        reverse: true,
    }),
    // clinicInfos: {
    //     bigTitle: 'Veja algumas das especialidades e tratamentos das nossas clínicas',
    //     items: [
    //         {
    //             text: 'Clínica Geral e Pediatria.',
    //         },
    //         {
    //             text: 'Invisalign.'
    //         },
    //         {
    //             text: 'Ortodontia.'
    //         },
    //         {
    //             text: 'Implantodontia.'
    //         }
    //     ],
    // },
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
            routerLink: '/fale-conosco/solicite-uma-cotacao',
            text: 'Clique e solicite cotação',
            target: '_self',
            queryParams: {
                plano: 'careplus-soho',
                planoSaude:true
            }
        }),
        backgroundColorClass: 'blue-background-color',
        imagePath: 'assets/svg/calendar.svg'
    }),
    tableHead: [
        {
            id: 'hospitais',
            title: 'Hospitais'
        },
        {
            id: 'especialIII',
            title: 'Especial III'
        },
        {
            id: 'masterI',
            title: 'Master I'
        }
    ],
    hospitalList: new HospitalList({
        "states": [
            new Hospital({
                "id": 1,
                "state": "São Paulo",
                "unities": [
                    {
                        "id": 1,
                        "name": "AACD",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "name": "Leforte - Liberdade",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "name": "AC Camargo",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "name": "Santa Paula",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "name": "Sino Brasileiro (Osasco)",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 6,
                        "name": "Nipo Brasileiro",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "name": "São Camilo (Santana)",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 8,
                        "name": "São Camilo (Ipiranga)",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 9,
                        "name": "São Camilo (Pompéia)",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 10,
                        "name": "Moriah",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 11,
                        "name": "9 de Julho",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 12,
                        "name": "HCOR",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 13,
                        "name": "INCOR",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 14,
                        "name": "Pro Matre",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 15,
                        "name": "Santa Catarina",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 16,
                        "name": "São Luiz",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 17,
                        "name": "Leforte",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 18,
                        "name": "Infantil Sabará",
                        "type": "Hospital", "plans": [


                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 19,
                        "name": "Oswaldo Cruz",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 20,
                        "name": "Samaritano",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 21,
                        "name": "Sírio Libanês",
                        "type": "Hospital", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 22,
                        "name": "Albert Einstein ", "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 23,
                        "name": "A+",
                        "type": "Laboratório", "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 24,
                        "name": "CDB",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 25,
                        "name": "Delboni Auriemo",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 26,
                        "name": "Salomão e Zoppi",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 27,
                        "name": "Digimagem",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 28,
                        "name": "CURA",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 29,
                        "name": "Lavoisier",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 30,
                        "name": "Centro de Diagnose HCOR",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 31,
                        "name": "RDO Diagnósticos",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 32,
                        "name": "Alta Diagnósticos",
                        "type": "Laboratório",
                        "plans": [

                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },

                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 33,
                        "name": "Centro Diag. Hosp Sírio",
                        "type": "Laboratório",
                        "plans": [

                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },

                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 34,
                        "name": "Fleury (Somente Análises Clinicas)",
                        "type": "Laboratório",
                        "plans": [

                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },

                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 35,
                        "name": "Fleury",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 36,
                        "name": "Club DA",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 37,
                        "name": "Centro Diag. Hosp Einstein",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    }
                ]
            }),
            new Hospital({
                "id": 2,
                "state": "Rio de Janeiro",
                "unities": [
                    {
                        "id": 1,
                        "name": "São Lucas",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "name": "Casa de Saúde Sta. Lúcia",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "name": "Tijutrauma",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "name": "Badim",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "name": "Policlínica de Botafogo",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 6,
                        "name": "Sabin Israelita",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "name": "Clínicas de Jacarepaguá",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 8,
                        "name": "Riomar", "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 9,
                        "name": "Perin. Laranjeiras", "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 10,
                        "name": "Perin. Barra", "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 11,
                        "name": "S.José (Humaitá)",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 12,
                        "name": "Quinta Dor",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 13,
                        "name": "Copa Dor",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 14,
                        "name": "Barra Dor",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 15,
                        "name": "Rios Dor",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 16,
                        "name": "Vitória",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 17,
                        "name": "S.Vicente Gávea", "type": "Hospital",
                        "plans": [


                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 18,
                        "name": "Pro-Cardíaco",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 19,
                        "name": "Copa Star",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 20,
                        "name": "Samaritano (Botafogo)",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 21,
                        "name": "Samaritano (Barra)",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 22,
                        "name": "A +",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 23,
                        "name": "Lâmina",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 24,
                        "name": "Bronstein",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 25,
                        "name": "Sergio Franco",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 26,
                        "name": "Maiolino",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 27,
                        "name": "Eliel Figueiredo",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    },
                    {
                        "id": 28,
                        "name": "Felippe Mattoso",
                        "type": "Laboratório",
                        "plans": [{
                            "id": 3,
                            "plan": "Especial III",
                            "included": true
                        },
                        {
                            "id": 6,
                            "plan": "Master I",
                            "included": true
                        }
                        ]
                    },
                    {
                        "id": 29,
                        "name": "Club DA",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 6,
                                "plan": "Master I",
                                "included": true
                            }
                        ]
                    }
                ]
            })
        ]
    })
};