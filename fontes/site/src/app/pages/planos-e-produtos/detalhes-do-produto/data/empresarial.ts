import { IconCardModel, ButtonModel, IconCardsSectionModel, InfoSectionModel, SimpleBannerModel, BreadcrumbModel, HospitalList, Hospital } from 'src/app/models';

export default {
    id: 'careplus-empresarial',
    name: 'Care Plus Empresarial',
    title: 'Care Plus Empresarial | Mais de 200 Vidas | Plano de Saúde e Odontológico Premium | Care Plus',
    description: 'O Care Plus Empresarial apresenta plano de saúde e odontológico premium, totalmente customizáveis, para empresas com mais de 200 vidas.',
    simpleBannerModel: new SimpleBannerModel({
        title: 'Empresarial: planos para mais de 200 vidas',
        description: 'O Care Plus Empresarial apresenta planos altamente customizáveis, para mais de 200 vidas e é indicado para grandes empresas.',
        image: 'assets/img/banner_planos_empresarial.png',
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
                name: 'Care Plus Empresarial',
                link: '/planos-e-produtos/careplus-empresarial',
                active: true
            })
        ],
        hasAnchor: true,
    }),
    aboutPlan: new InfoSectionModel({
        smallTitle: 'SOBRE O PLANO',
        bigTitle: 'Saiba mais sobre o Care Plus Empresarial e como contratá-lo',
        subDescriptions: [
            'Para empresas com mais de 200 vidas que buscam um plano de saúde com características diferenciadas e, acima de tudo, que possam contar com um parceiro na gestão para que seu benefício seja saudável, o Care Plus Empresarial é a melhor opção.',
            'Esse produto disponibiliza diversos diferenciais voltados a comodidade, praticidade, qualidade e, acima de tudo, muita segurança. Nossos beneficiários do Care Plus Empresarial contam com uma jornada de muito acolhimento e cuidado.',
            'Alguns benefícios são semelhantes aos do Clube Care Plus, inclusive com a possibilidade de contratar coberturas adicionais como medicina reprodutiva, dermatologia estética e cirurgia plástica.'
        ],
        imageSrc: 'assets/img/sobre_plano_empresarial.png',
        button: new ButtonModel({
            text: 'Solicite uma Cotação',
            routerLink: '/fale-conosco/solicite-uma-cotacao',
            queryParams: {
                plano: 'careplus-empresarial',
                planoSaude: true
            }
        }),
        parallax: true,
        htag: 'h2'
    }),
    plansTypes: [
        {
            htag: 'h3',
            title: 'Planos Care Plus Empresarial',
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
                    title: 'Especial II',
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
                            text: 'Check-up para o titular e cônjuge garantindo a saúde do seu colaborador (contratável).'
                        },
                        {
                            text: 'Consultas domiciliares com clínico geral e pediatra na casa de nossos beneficiários.'
                        }
                    ]
                },
                {
                    htag: 'h3',
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
                            text: 'Check-up para o titular e cônjuge garantindo a saúde do seu colaborador (contratável).'
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
            htag: 'h3',
            title: 'Planos Care Plus Empresarial',
            description: 'Selecione ao lado qual tipo de plano gostaria de visualizar.',
            active: false,
            id: 2,
            plans: [
                {
                    type: 'default',
                    title: 'Plano Odontológico Care Plus',
                    description: 'Veja as possibilidades contratáveis abaixo:',
                    items: [
                        {
                            text: 'Coberturas em todos os planos: Diagnóstico, Urgência, Prevenção, Odontopediatria, Dentística, Periodontia, Endodontia, Cirurgia, Radiologia, Prótese (Rol mínimo ANS)',
                        },
                        {
                            text: 'Coberturas adicionais contratáveis: Ortodontia, Prótese Completa e Implante',
                        },
                        {
                            text: 'Livre Escolha com diferentes Múltiplos de Reembolso: 2XTI, 4XTI, 7XTI, 10XTI, 15XTI e 20XTI (TI = Tabela de Indenização)'
                        },
                        {
                            text: 'Rede Odonto Especial, Odonto Executivo e Odonto Master'
                        },
                        {
                            text: 'Abrangência Nacional'
                        }
                    ]
                },

                {
                    type: 'default',
                    title: 'Diferenciais exclusivos e únicos Odontologia Care Plus',
                    description: '',
                    items: [
                        {
                            text: 'Contratação Simplificada: menos burocracia e mais facilidade durante a contratação.'
                        },
                        {
                            text: 'Acesso via Web e APP: consulta de autorizações, prévias, solicitação de reembolsos, rede credenciada por GEO localização e carteirinha virtual.',
                        },
                        {
                            text: 'Reembolso On-line: facilidade e agilidade ao solicitar reembolsos.'
                        },
                        {
                            text: 'Care Plus Garante*: a Care Plus se compromete a se posicionar sobre as solicitações de reembolso e prévia de reembolso das coberturas contratadas dentro dos prazos designados.'
                        },
                        {
                            text: 'Desconto em medicamentos: oferecemos aos nossos beneficiários a vantagem de obter descontos em medicamentos nas principais farmácias do Brasil.'
                        },
                        {
                            text: 'Atendimento Personalizado: Central de relacionamento 24 horas - 0800 013 2992|Chat - acesso pela área logada do beneficiário no site da Care Plus.'
                        },
                        {
                            text: 'Care Plus Clinic**: atendimento excepcional com a conveniência de tratar todas as especialidades odontológicas em um único local.'
                        }
                    ],
                    detalhe: [
                        {
                            text: '*É necessário aceitar os termos do programa disponível na área do beneficiário.'
                        },
                        {
                            text: '**Verifique quais planos têm acesso à clínica.'
                        }
                    ]
                },

            ]
        }
    ],
    dentalSection: new InfoSectionModel({
        smallTitle: 'ODONTOLÓGICO',
        bigTitle: 'Saiba como funciona o Plano Odontológico',
        description: 'Temos o plano odontológico que se encaixa nas necessidades de sua empresa',
        subDescription: 'Nosso plano odontológico também faz parte das classificações: Care Plus Soho, Clube Care Plus e Care Plus Empresarial, e se ajustam a todo e qualquer tamanho de empresa.',
        imageSrc: 'assets/img/bloco-plano-odontologico.jpg',
        button: new ButtonModel({
            text: 'Solicite uma Cotação',
            routerLink: '/fale-conosco/solicite-uma-cotacao',
            queryParams: {
                plano: 'careplus-empresarial',
                planoOdontologico: true
            }
        }),
        htag: 'h4'
    }),
    hospitalListSection: {
        htag: 'h5',
        smallTitle: 'Rede Credenciada Planos – Care Plus Empresarial',
        bigTitle: 'Conheça todos os hospitais e laboratórios disponíveis para os Planos – Care Plus Empresarial'
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
            routerLink: '/a-careplus/gestao-de-saude'
        }),
        cards: [
            new IconCardModel({
                "type": "icon",
                "title": "Programas Preventivos",
                "description": "A Care Plus oferece diversos programas preventivos de saúde e acompanhamento, uma vida saudável.",
                "imagePath": "assets/svg/shield.svg",
                "routerLink": "/a-careplus/gestao-de-saude/programas-preventivos"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Serviços On-line",
                "description": "Os beneficiários podem aproveitar alguns serviços a distância com a qualidade, o carinho e o cuidado que só a Care Plus tem.",
                "imagePath": "assets/svg/monitor-screen.svg",
                "backgroundColorClass": "white-background-color",
                "routerLink": "/a-careplus/gestao-de-saude/servicos-online"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Personal System",
                "description": "A Care Plus oferece consultas em clínicas próprias com médicos, nutricionistas e psicólogos. Conheça os programas.",
                "imagePath": "assets/svg/doctor.svg",
                "routerLink": "/a-careplus/gestao-de-saude/personal-system"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Programas Empresariais",
                "description": "A Care Plus disponibiliza  médicos, nutricionistas, enfermeiras e psicólogos para realizar atendimento no ambiente das empresas.",
                "imagePath": "assets/svg/doctorphone.svg",
                "routerLink": "/a-careplus/gestao-de-saude/programas-empresariais"
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
            'Temos clínicas na Vila Olímpia e Brooklin, em São Paulo e no RioSul Shopping, no Rio de Janeiro.',
        ],
        button: new ButtonModel({
            text: 'Conheça a Care Plus Clinic',
            link: 'https://www.careplusclinic.com.br'
        }),
        imageSrc: 'assets/img/Imagem-site-CP-Clinic.jpg',
        reverse: true,
    }),
    // clinicInfos: {
    //     bigTitle: 'Veja alguns dos serviços e atendimento de nossa clínica',
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
                plano: 'careplus-empresarial',
                planoSaude: true
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
            id: 'basico',
            title: 'Básico'
        },
        {
            id: 'especialII',
            title: 'Especial II'
        },
        {
            id: 'especialIII',
            title: 'Especial III'
        },
        {
            id: 'executivoI',
            title: 'Executivo I'
        },
        {
            id: 'executivoII',
            title: 'Executivo II'
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Hospital",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "id": 22,
                        "name": "Albert Einstein ",

                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "type": "Laboratório",

                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "id": 33,
                        "name": "Centro Diag. Hosp Sírio",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "id": 34,
                        "name": "Fleury (Somente Análises Clinicas)",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "id": 35,
                        "name": "Fleury",
                        "type": "Laboratório",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "name": "Riomar",

                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "name": "Perin. Laranjeiras",

                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "name": "Perin. Barra",

                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "name": "S.Vicente Gávea",

                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "name": "Copa Star",
                        "type": "Hospital",
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                        "plans": [
                            {
                                "id": 1,
                                "plan": "Basico",
                                "included": true
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": true
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": true
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": true
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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
                                "id": 1,
                                "plan": "Basico",
                                "included": false
                            },
                            {
                                "id": 2,
                                "plan": "Especial II",
                                "included": false
                            },
                            {
                                "id": 3,
                                "plan": "Especial III",
                                "included": false
                            },
                            {
                                "id": 4,
                                "plan": "Executivo I",
                                "included": false
                            },
                            {
                                "id": 5,
                                "plan": "Executivo II",
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