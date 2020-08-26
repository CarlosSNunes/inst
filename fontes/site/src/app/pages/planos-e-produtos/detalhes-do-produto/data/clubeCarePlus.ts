import { IconCardModel, ButtonModel, IconCardsSectionModel, InfoSectionModel, SimpleBannerModel, BreadcrumbModel } from 'src/app/models';

export default {
    id: 'clube-careplus',
    name: 'Clube Care Plus',
    simpleBannerModel: new SimpleBannerModel({
        title: 'Clube Care Plus: planos 30 a 200 vidas',
        description: 'O Clube Care Plus apresenta planos para empresas, de 30 a 200 vidas e é indicado para aquelas que estão em crescimento e expandindo seus negócios.',
        image: 'assets/img/clube-careplus-banner.jpg',
        breadcrumbs: [
            new BreadcrumbModel({
                name: 'Home',
                link: '/home',
            }),
            new BreadcrumbModel({
                name: 'Planos e Produtos',
                link: '/produtos-e-planos-careplus',
            }),
            new BreadcrumbModel({
                name: 'Clube Care Plus',
                link: '/produtos-e-planos-careplus/clube-careplus',
                active: true
            })
        ],
        hasAnchor: true,
    }),
    aboutPlan: new InfoSectionModel({
        smallTitle: 'SOBRE O PLANO',
        bigTitle: 'Saiba mais sobre o Clube Care Plus e como contratá-lo',
        subDescriptions: [
            'Esse produto tem características excepcionais. Além de contar com cobertura em hospitais, laboratórios e clínicas altamente renomadas, oferece diferenciais de serviços tanto para o beneficiário como gestores de RH, mas que foquem no acolhimento, agilidade e humanização.',
            'Alguns benefícios são semelhantes aos da linha Clube Care Plus, porém existe também a possibilidade de contratar coberturas opcionais para completar, ainda mais, o plano. Dentre elas, destacamos reprodução humana, dermatologia estética e cirurgia plástica.'
        ],
        imageSrc: 'assets/img/about-plan-section-careplus-club.jpg',
        button: new ButtonModel({
            text: 'SOLICITE UMA COTAÇÃO',
            routerLink: '/fale-conosco',
            queryParams: {
                plano: 'clube-careplus'
            }
        }),
        parallax: true
    }),
    plansTypes: [
        {
            title: 'Planos de Saúde',
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
            title: 'Planos de Odontológicos',
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
        subDescription: 'Nossos planos odontológicos também fazem parte das classificações: Soho, Clube Care Plus e Empresarial, e se ajustam a todo e qualquer tamanho de empresa.',
        imageSrc: 'assets/img/dental-plan.jpg',
        button: new ButtonModel({
            text: 'SOLICITE UMA COTAÇÃO',
            routerLink: '/fale-conosco',
            queryParams: {
                plano: 'clube-careplus',
                planoOdontologico: true
            }
        })
    }),
    hospitalListSection: {
        smallTitle: 'Rede Credenciada Planos – Clube Care Plus',
        bigTitle: 'Conheça todos os hospitais e laboratórios disponíveis para os Planos – Clube Care Plus.'
    },
    plansSection: new InfoSectionModel({
        smallTitle: 'PLANOS',
        bigTitle: 'Esse plano não atende o tamanho da sua empresa? Conheça os demais.',
        description: 'Temos Planos para o tamanho exato de sua empresa.',
        subDescription: 'Temos planos para empresas de 2 a 29 vidas, de 30 a 200 vidas ou de mais de 200 vidas. Acesse nossa página de Planos e Produtos e conheça todos.',
        imageSrc: 'assets/svg/plans-section-illustation.svg',
        button: new ButtonModel({
            text: 'VER TODOS OS PLANOS',
            routerLink: '/produtos-e-planos-careplus'
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
                "title": "Programas preventivos",
                "description": "A Care Plus oferece aos seus beneficiários diversos programas preventivos de saúde e de acompanhamento para auxiliar seus beneficiários a ter uma vida mais saudável.",
                "imagePath": "assets/svg/shield.svg"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Serviços on-line",
                "description": "OServiços à distância com qualidade, carinho e cuidado que só a Care Plus tem com seus clientes.",
                "imagePath": "assets/svg/monitor-screen.svg",
                "backgroundColorClass": "white-background-color"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Personal System",
                "description": "A Care Plus oferece consultas em clínicas próprias com médicos, nutricionistas e psicólogos. Conheça os programas.",
                "imagePath": "assets/svg/doctor.svg"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Programas empresariais",
                "description": "A Care Plus oferece alguns atendimentos de médicos, nutricionistas, enfermeiras e psicólogos nas empresas clientes. Conheça os programas.",
                "imagePath": "assets/svg/doctorphone.svg"
            }),
            new IconCardModel({
                "type": "icon",
                "title": "Nossas parcerias",
                "description": "A Care Plus tem parceiros que atuam em conformidade com os nossos valores, gerando bem-estar e saúde para você.",
                "imagePath": "assets/svg/doctor.svg"
            }),
        ],
        columnClass: 'is-3-desktop'
    }),
    clinicSection: new InfoSectionModel({
        smallTitle: 'CLÍNICAS',
        bigTitle: 'Care Plus Clinic',
        subDescriptions: [
            'As clínicas Care Plus Clinic foram desenvolvidas para oferecer aos nossos pacientes serviços de saúde com excelência técnica, conforto e qualidade excepcional de atendimento.',
            'Elas contam com o que há de mais moderno e eficiente, obedecendo ao mais alto grau de exigência para estabelecimentos de saúde determinado pela ANVISA, que assegura os mais rígidos padrões de qualidade e excelência.',
            'Temos clínicas na Vila Olímpia e CENU, em São Paulo e no Barra Sul Shopping, no Rio de Janeiro.',
        ],
        imageSrc: 'assets/img/clinic-section.jpg',
        reverse: true,
    }),
    clinicInfos: {
        bigTitle: 'Veja alguns dos serviços e atendimento de nossa clínica',
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
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/#'
        }),
    }),
    secondCard: new IconCardModel({
        title: 'Solicite uma Cotação',
        type: 'icon',
        button: new ButtonModel({
            routerLink: '/fale-conosco',
            text: 'Clique e solicite cotação',
            queryParams: {
                plano: 'clube-careplus'
            }
        }),
        imagePath: 'assets/svg/calendar.svg'
    })
};