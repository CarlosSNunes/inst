import { ButtonModel, InfoSectionModel, IconCardModel } from 'src/app/models';

export const plansMock = [
    {
        id: 'soho',
        name: 'Soho',
        title: 'Soho',
        description: 'Para 2 a 29 vidas',
        image: 'assets/img/clube-careplus-banner.jpg',
        aboutPlan: {
            smallTitle: 'SOBRE O PLANO',
            bigTitle: 'Conheça mais do Soho e como contrata-lo',
            subDescriptions: [
                'O plano Clube Care Plus só está disponível para organizações com um quadro de funcionários acima de 200 pessoas. Além disso, é preciso lembrar que a Care Plus prioriza a contratação de alguns setores, sendo alguns deles consultórios de médicos e dentistas, agências de comunicação, escritórios de advocacia e empresas ligadas ao setor financeiro.',
                'Alguns benefícios são semelhantes ao da linha SoHo, porém existe também a possibilidade de contratar coberturas opcionais para seus colaboradores. Dentre elas, serviços como dermatologia estética e cirurgia plástica, algo muito raro de ser disponibilizado mesmo nas categorias premium.',
                'Uma cobertura exclusiva do Clube Care Plus são os serviços de reprodução humana, contemplando todos os procedimentos disponíveis de medicina reprodutiva.'
            ],
            imageSrc: 'assets/img/about-plan-section-careplus-club.jpg',
            button: new ButtonModel({
                text: 'SOLICITE UMA COTAÇÃO',
                routerLink: '/'
            }),
            parallax: true
        }
    },
    {
        id: 'clube-careplus',
        name: 'Clube Care Plus',
        title: 'Clube Care Plus',
        description: 'Para empresas de 30 a 200 vidas.',
        image: 'assets/img/clube-careplus-banner.jpg',
        aboutPlan: {
            smallTitle: 'SOBRE O PLANO',
            bigTitle: 'Conheça mais do Clube Care Plus e como contrata-lo',
            subDescriptions: [
                'O plano Clube Care Plus só está disponível para organizações com um quadro de funcionários acima de 200 pessoas. Além disso, é preciso lembrar que a Care Plus prioriza a contratação de alguns setores, sendo alguns deles consultórios de médicos e dentistas, agências de comunicação, escritórios de advocacia e empresas ligadas ao setor financeiro.',
                'Alguns benefícios são semelhantes ao da linha SoHo, porém existe também a possibilidade de contratar coberturas opcionais para seus colaboradores. Dentre elas, serviços como dermatologia estética e cirurgia plástica, algo muito raro de ser disponibilizado mesmo nas categorias premium.',
                'Uma cobertura exclusiva do Clube Care Plus são os serviços de reprodução humana, contemplando todos os procedimentos disponíveis de medicina reprodutiva.'
            ],
            imageSrc: 'assets/img/about-plan-section-careplus-club.jpg',
            button: new ButtonModel({
                text: 'SOLICITE UMA COTAÇÃO',
                routerLink: '/'
            }),
            parallax: true
        }
    },
    {
        id: 'empresarial',
        name: 'Empresarial',
        title: 'Empresarial',
        description: 'Para mais de 200 vidas',
        image: 'assets/img/clube-careplus-banner.jpg',
        aboutPlan: {
            smallTitle: 'SOBRE O PLANO',
            bigTitle: 'Conheça mais do Empresarial e como contrata-lo',
            subDescriptions: [
                'O plano Clube Care Plus só está disponível para organizações com um quadro de funcionários acima de 200 pessoas. Além disso, é preciso lembrar que a Care Plus prioriza a contratação de alguns setores, sendo alguns deles consultórios de médicos e dentistas, agências de comunicação, escritórios de advocacia e empresas ligadas ao setor financeiro.',
                'Alguns benefícios são semelhantes ao da linha SoHo, porém existe também a possibilidade de contratar coberturas opcionais para seus colaboradores. Dentre elas, serviços como dermatologia estética e cirurgia plástica, algo muito raro de ser disponibilizado mesmo nas categorias premium.',
                'Uma cobertura exclusiva do Clube Care Plus são os serviços de reprodução humana, contemplando todos os procedimentos disponíveis de medicina reprodutiva.'
            ],
            imageSrc: 'assets/img/about-plan-section-careplus-club.jpg',
            button: new ButtonModel({
                text: 'SOLICITE UMA COTAÇÃO',
                routerLink: '/'
            }),
            parallax: true
        }
    }
]

export const sectionAboutPlan: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'SOBRE O PLANO',
    bigTitle: 'Conheça mais do Clube Care Plus e como contrata-lo',
    subDescriptions: [
        'O plano Clube Care Plus só está disponível para organizações com um quadro de funcionários acima de 200 pessoas. Além disso, é preciso lembrar que a Care Plus prioriza a contratação de alguns setores, sendo alguns deles consultórios de médicos e dentistas, agências de comunicação, escritórios de advocacia e empresas ligadas ao setor financeiro.',
        'Alguns benefícios são semelhantes ao da linha SoHo, porém existe também a possibilidade de contratar coberturas opcionais para seus colaboradores. Dentre elas, serviços como dermatologia estética e cirurgia plástica, algo muito raro de ser disponibilizado mesmo nas categorias premium.',
        'Uma cobertura exclusiva do Clube Care Plus são os serviços de reprodução humana, contemplando todos os procedimentos disponíveis de medicina reprodutiva.'
    ],
    imageSrc: 'assets/img/about-plan-section-careplus-club.jpg',
    button: new ButtonModel({
        text: 'SOLICITE UMA COTAÇÃO',
        routerLink: '/'
    }),
    parallax: true
});

export const travelSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'CARE PLUS TRAVEL',
    bigTitle: 'Vai viajar ao exterior? Conte com o Care Plus Travel',
    description: 'O Care Plus Travel tem cobertura internacional de até US$ 300.000,00',
    subDescription: 'Desbrave o mundo sem preocupação. A Care Plus garante segurança e saúde para você e sua família curtirem a viagem com tranquilidade. Entre em contato com o gestor do seu plano para contratar esse benefício.',
    imageSrc: 'assets/img/plane.jpg',
});
export const dentalSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'ODONTOLÓGICO',
    bigTitle: 'Saiba como funciona o Plano Odontológico',
    description: 'A Care Plus tem Planos Odontológicos para todo tamanho de empresa',
    subDescription: 'Os planos odontológicos da Care Plus também fazem parte das classificações: Soho, Clube Care Plus e Empresarial. E podem ser cotados junto com seu Plano de Saúde.',
    imageSrc: 'assets/img/dental-plan.jpg',
    button: new ButtonModel({
        text: 'SOLICITE UMA COTAÇÃO',
        routerLink: '/fale-conosco',
    })
});
export const plansSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'PLANOS',
    bigTitle: 'Esse plano não atende a sua empresa? Veja outros.',
    description: 'Se esse plano não te atender conheça outros planos Care Plus',
    subDescription: 'A Care Plus tem planos para empresas de 2 a 29 vidas, de 30 a 200 vidas ou de mais de 200 vidas. Acesse nossa Página de Planos e Produtos e conheça todos eles.',
    imageSrc: 'assets/svg/plans-section-illustation.svg',
    button: new ButtonModel({
        text: 'VER TODOS OS PLANOS',
        routerLink: '/produtos-e-planos-careplus'
    }),
    reverse: true,
    removeLine: true
});

export const clinicSection: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'CLÍNICAS',
    bigTitle: 'Nossas clínicas',
    subDescriptions: [
        'Nossas clínicas foram desenvolvidas para oferecer aos seus beneficiários e ao público mais exigente serviços de saúde com excelência técnica, conforto e qualidade excepcional de atendimento.',
        'Nossa clínica conta com o que há de mais moderno e eficiente, obedecendo ao mais alto grau de exigência para estabelecimentos de saúde determinado pela ANVISA, que assegura os mais rígidos padrões de qualidade e excelência. '
    ],
    imageSrc: 'assets/img/clinic-section.jpg',
    reverse: true,
});

export const secondCard: IconCardModel = new IconCardModel({
    title: 'Solicite uma Cotação',
    type: 'icon',
    button: new ButtonModel({
        routerLink: '/',
        text: 'Clique e solicite cotação',
    }),
    imagePath: 'assets/svg/calendar.svg'
});
