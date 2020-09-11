import { BreadcrumbModel, ButtonModel, HeroBannerModel, InfoSectionModel, VideoModel } from 'src/app/models';

export const heroBannerModel: HeroBannerModel = new HeroBannerModel({
    video: new VideoModel(
        {
            url: 'assets/videos/video-teste.mp4',
            type: 'video/mp4'
        }
    ),
    bigTitle: 'Gestão de Saúde: o nosso jeito único de cuidar da sua saúde e bem estar',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home'
        }),
        new BreadcrumbModel({
            name: 'Gestão de Saude',
            link: '/gestao-de-saude',
            active: true
        })
    ],
    contentContainerMaxWidth: 862,
    hasAnchor: true
});

export const infoSections: InfoSectionModel[] = [
    new InfoSectionModel({
        smallTitle: 'GESTÃO DE SAÚDE',
        bigTitle: 'Conheça a Gestão de Saúde, uma iniciativa exclusiva da Care Plus',
        subDescription: 'A Gestão de Saúde conta com programas e serviços especiais feitos na medida para você. Desde ações preventivas até descontos em empresas de alimentação saudável e consultoria esportiva. Confira a seguir!',
        imageSrc: 'assets/img/section-gestao-de-saude-image-component-hestao-de-saude-home.jpg',
        alignCenter: true,
        removeLine: true
    }),
    new InfoSectionModel({
        bigTitle: 'Programas Preventivos',
        subDescription: 'Tomar uma atitude somente quando há uma doença aparente é um erro que deve ser evitado. Pensando nisso, a Care Plus criou programas preventivos para você começar a cuidar da saúde o quanto antes. Assim, além de reduzir o risco de patologias, você pode levar uma vida muito mais saudável e segura.',
        imageSrc: 'assets/img/section-programas-preventivos-gestao-de-saude-home.jpg',
        alignCenter: true,
        removeLine: true,
        reverse: true,
        backgroundColorClass: 'blue-background-color',
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/gestao-de-saude/programas-preventivos'
        })
    }),
    new InfoSectionModel({
        bigTitle: 'Serviços Online',
        subDescription: 'O mundo é digital. E a Care Plus também. Desde o início, investimos em tecnologia para que os nossos beneficiários, empresas e parceiros tenham toda a facilidade e comodidade que merecem. Assim, disponibilizamos diversos serviços online, mantendo a mesma qualidade de sempre. ',
        imageSrc: 'assets/img/section-sevicos-online-gestao-de-saude-home.jpg',
        alignCenter: true,
        removeLine: true,
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/gestao-de-saude/servicos-online'
        })
    }),
    new InfoSectionModel({
        bigTitle: 'Personal System',
        subDescription: 'Pensando sempre na saúde dos nossos parceiros, a Care Plus criou o Personal System, um programa especializado na promoção de saúde e prevenção de doenças cardiovasculares, oferecendo atendimento em clínicas próprias, rede credenciada e diretamente nas empresas.',
        imageSrc: 'assets/img/section-personal-system-gestao-de-saude-home.jpg',
        alignCenter: true,
        removeLine: true,
        reverse: true,
        backgroundColorClass: 'blue-background-color',
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/gestao-de-saude/personal-system'
        })
    }),
    new InfoSectionModel({
        bigTitle: 'Programas Empresariais',
        subDescription: 'A Care Plus oferece alguns atendimentos de médicos, nutricionistas, enfermeiras(os) e psicólogos nas empresas clientes. Conheça mais sobre esses programas e nossa equipe altamente capacitada.',
        imageSrc: 'assets/img/section-programas-empresariais-image-gestao-de-saude-home.jpg',
        alignCenter: true,
        removeLine: true,
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/gestao-de-saude/programas-empresariais'
        })
    }),
    new InfoSectionModel({
        bigTitle: 'Nossas Parcerias',
        subDescription: 'Sempre buscando as melhores soluções, estabelecemos parcerias estratégicas com algumas empresas. Dessa forma, além de estendermos a nossa atuação e a de nossos parceiros, conseguimos oportunizar uma experiência ainda mais completa para todos os beneficiários.',
        imageSrc: 'assets/img/section-nossas-parcerias-image-gestao-de-saude-home.jpg',
        alignCenter: true,
        removeLine: true,
        reverse: true,
        backgroundColorClass: 'blue-background-color',
        button: new ButtonModel({
            text: 'SAIBA MAIS',
            routerLink: '/gestao-de-saude/nossas-parcerias'
        })
    })
];