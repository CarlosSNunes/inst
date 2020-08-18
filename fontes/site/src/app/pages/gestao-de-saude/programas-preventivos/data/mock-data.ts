import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel, ButtonModel, IconCardsSectionModel } from 'src/app/models';
import PersonalizedSectionCards from './personalized-section-cards';

export const simpleBannerModel: SimpleBannerModel = new SimpleBannerModel({
    title: 'Programas preventivos',
    description: 'A hora de cuidar da sua saúde é agora. Conheça os nossos programas preventivos e descubra o ideal para você.',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/home',
        }),
        new BreadcrumbModel({
            name: 'Gestão de Saúde',
            link: '/gestao-de-saude',
        }),
        new BreadcrumbModel({
            name: 'Programas preventivos',
            link: '/gestao-de-saude/programas-preventivos',
            active: true
        })
    ],
    hasAnchor: true,
    image: 'assets/img/banner-gestao-de-saude-programas-preventivos.jpg'
});

export const mommyCareSection = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Mommy Care',
    subDescriptions: [
        'O Mommy Care é um programa de acompanhamento, acolhimento e orientação às gestantes realizado por meio de visitas em domicílio*, contatos telefônicos, troca de mensagens e teleconferência.',
        'Durante todas as fases da gestação, obstetrizes e enfermeiras estão disponíveis para esclarecer dúvidas e solucionar as necessidades das beneficiárias.',
        'Um dos destaques deste programa é a visita nutricional para introdução alimentar do bebê*.',
        '*As visitas presenciais serão realizadas apenas na Grande São Paulo, cidades do Rio de Janeiro e Belo Horizonte.'
    ],
    imageSrc: 'assets/img/section-mommy-care-programas-preventicos-image.jpg',
    removeLine: false,
    objectFit: 'cover'
});

export const prevencaoDeDoencasCardiovascularesSection = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Prevenção de doenças cardiovasculares',
    subDescriptions: [
        'Prevenir as doenças cardiovasculares deve ser uma prioridade na vida de homens e mulheres. Por isso, para apoiar essa premissa, a Gestão de Saúde desenvolveu um programa completo de cuidado com os beneficiários. <br/> Além de atendimento com equipe multidisciplinar na clínica Personal System para avaliação e orientação, os integrantes do programa têm acesso a uma série de vantagens e comodidades. Entre elas:',
        '- Realização de exames (medição de taxa metabólica de repouso e bioimpedância) <br/> - Atendimento online com nutricionistas e psicólogos <br/> - Descontos exclusivos nos parceiros de alimentação saudável e assessoria esportiva <br/> - Auxílio para aquisição de medicamentos e muito mais!'
    ],
    reverse: true,
    imageSrc: 'assets/img/section-prev-doencas-cardio-image.jpg',
    removeLine: false,
    objectFit: 'cover'
});

export const programaDeAcolhimento = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Programa de acolhimento',
    subDescriptions: [
        'Neste programa, os beneficiários que necessitam de acompanhamento, seja por conta de uma hospitalização recente ou por falta de conhecimento sobre como cuidar da saúde, contam com o suporte de uma equipe de acolhimento.',
        'Os profissionais servirão de fonte de informação e orientação para que os beneficiários tenham o melhor tratamento (Care Coordinator) e encaminhamentos adequados (Care Navigation).'
    ],
    imageSrc: 'assets/img/section-programas-de-acolhimento-image.jpg',
    removeLine: false,
    objectFit: 'cover'
});

export const mentalHealth = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Mental Health',
    subDescriptions: [
        'O cuidado com corpo é fundamental, mas a saúde mental também deve sempre receber atenção. Pensando nisso, a Care Plus oferece um programa de orientação e acompanhamento psicológico 24 horas, durante 7 dias da semana, inclusive aos finais de semana e feriados.',
        'Este canal é exclusivo para atendimento e direcionamento em situações de crise pessoal e/ou profissional.',
        'Assim, sempre que o beneficiário precisar de apoio, poderá entrar em contato com a equipe especializada, com total garantia de sigilo e confidencialidade.'
    ],
    imageSrc: 'assets/img/section-mental-health-image.jpg',
    reverse: true,
    removeLine: false,
    objectFit: 'cover'
});

export const cuidadosDaFamilia = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Cuidados da Família',
    subDescriptions: [
        'Programa dedicado às famílias que têm crianças com necessidades especiais',
        'Os familiares de crianças portadoras de Transtorno do Espectro Autista (TEA) e outras condições genéticas, como a Síndrome de Down, podem participar deste programa de acolhimento.',
        'Nele, a Care Plus oferece um canal de atendimento exclusivo 24 horas por dia, durante 7 dias da semana.'
    ],
    imageSrc: 'assets/img/section-cuidados-com-a-familia-image.jpg',
    removeLine: false,
    objectFit: 'cover'
});

export const programaDeCuidadoOncologico = new InfoSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Programa de cuidado oncológico',
    subDescriptions: [
        'Enfrentar o câncer exige uma rede de apoio forte. Por isso, a Care Plus oferece o cuidado centrado no paciente, com atendimento especializado em oncologia, como médicos e nutricionistas, para prevenir ou reverter situações evitáveis e o declínio do estado nutricional.',
        'São elegíveis para o acompanhamento os beneficiários de todas as faixas etárias com diagnóstico de câncer em qualquer etapa do tratamento, além de pacientes considerados curados.',
        'Além disso, o programa oferece, em parceria com hospitais, uma consulta em até 24 horas, seja no diagnóstico (novos casos) ou para pacientes que já se encontram em tratamento.'
    ],
    items: [
        {
            text: 'Cirúrgicos - Pré e/ou Pós'
        },
        {
            text: 'Não cirúrgicos - Imunoterapia, hormonoterapia, quimioterapia e radioterapia;'
        },
        {
            text: 'Grupos de controle - Sobreviventes do câncer ou considerados curados.'
        }
    ],
    reverse: true,
    imageSrc: 'assets/img/section-programa-de-cuidado-oncologico-image.jpg',
    removeLine: false,
    objectFit: 'cover'
});

export const iconCardsSectionModel: IconCardsSectionModel = new IconCardsSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Conheça nossos programas e serviços',
    bigTitleMaxWidth: 386,
    subDescription: 'Fique por dentro de tudo o que a Care Plus oferece para proporcionar a melhor experiência em saúde.',
    button: new ButtonModel({
        text: 'VEJA TODO OS PROGRAMAS',
        routerLink: '/gestao-de-saude'
    }),
    cards: PersonalizedSectionCards,
    columnClass: 'is-4-desktop'
});