import { SimpleBannerModel, BreadcrumbModel, InfoSectionModel, IconCardsSectionModel, ButtonModel } from 'src/app/models';
import PersonalizedSectionCards from './personalized-section-cards';

export const simpleBannerModel: SimpleBannerModel = {
    title: 'Personal System',
    description: 'Cuide da sua empresa e dos seus funcionários criando um ambiente seguro e saudável.',
    breadcrumbs: [
        new BreadcrumbModel({
            name: 'Home',
            link: '/'
        }),
        new BreadcrumbModel({
            name: 'A Care Plus',
            link: '/a-careplus',
        }),
        new BreadcrumbModel({
            name: 'Gestão de Saúde',
            link: '/a-careplus/gestao-de-saude'
        }),
        new BreadcrumbModel({
            name: 'Personal System',
            link: '/a-careplus/gestao-de-saude/personal-system',
            active: true
        })
    ],
    hasAnchor: true,
    hasFilters: false,
    image: 'assets/img/personal-system.jpg'
};

// Sem uso atualmente
export const consultaFacil: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'PERSONAL SYSTEM',
    bigTitle: 'Consulta Fácil',
    subDescriptions: [
        'Atendimento exclusivo aos beneficiários Care Plus, de todos os planos, no qual médicos clínicos gerais e pediatras estão disponíveis para fazer consultas em diversos horários e dias da semana, sem a necessidade de agendamento prévio.',
        'Consultas com clínicos gerais (a partir dos 15 anos) e pediatras (até 14 anos) para atendimento de patologias agudas que não precisam de atendimento em Pronto Socorro. Exemplos: diarreia, dor de cabeça, alergias, gripe, resfriado, inflamação/infecção na garganta, febre, tosse, dor de ouvido, secreção nasal, infecção urinária, e para crianças além das anteriores, alergia da fralda, choros em bebês sem causa aparente, refluxo, reação a vacina.',
        'Além do atendimento das condições clínicas agudas, os médicos poderão:',
        '- Esclarecer dúvidas relacionadas à saúde. <br/> - Indicar e agendar consulta com especialistas da Rede Credenciada Care Plus (Rede Plus). <br/> - Realizar consultas de devolutiva após a realização de check-up (consulta pós check-up). <br/> - Prescrever vacinas, conforme indicação.'
    ],
    imageSrc: 'assets/img/consulta-facil.jpg',
    removeLine: false,
    objectFit: 'cover',
    button: new ButtonModel({
        text: 'ACESSE O CONSULTA FÁCIL',
        link: 'http://consultafacil.careplusmais.com.br/'
    })
});
// Sem uso atualmente

// Sem uso atualmente
export const checkupDoViajante: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'PERSONAL SYSTEM',
    bigTitle: 'Check-up do Viajante',
    subDescriptions: [
        'Avaliação médica destinada a pessoas que farão viagens internacionais a lazer ou a trabalho para qualquer lugar do mundo, para tornar a sua viagem mais tranquila e segura.',
        'O objetivo da consulta é orientar sobre a prevenção de doenças através do aconselhamento para cuidados básicos que visam reduzir a exposição a situações de risco de doenças. As doenças podem ser adquiridas após a ingestão de água, de alimentos contaminados ou picadas de insetos.',
        'Além disso, pode haver a indicação de vacinas ou a necessidade de medicação para profilaxia de doenças, sugestão de kit de medicamentos para serem levados na viagem, além de avaliar o estado de saúde antes da viagem.',
        '<strong>Lembre-se: o contato deve ser feito com no mínimo 30 dias antes da viagem.</strong>'
    ],
    imageSrc: 'assets/img/checkup-viajante.jpg',
    removeLine: false,
    objectFit: 'cover',
    reverse: true,
});
// Sem uso atualmente

// Sem uso atualmente
export const monitoramentoDoCheckup: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'PERSONAL SYSTEM',
    bigTitle: 'Monitoramento de Check-up',
    subDescriptions: [
        'O check-up é uma avaliação clínica acompanhada de exames laboratoriais e de imagem que promove o rastreamento de doenças na ausência de sintomas e que permite soluções mais rápidas e ações preventivas para estimular o cuidado rotineiro com a saúde.',
        'A consulta de monitoramento pós check-up oferece aos beneficiários Care Plus, que possuem cobertura em seu plano, atenção contínua à saúde após a realização dos exames. Na consulta, o beneficiário poderá esclarecer as dúvidas relacionadas à saúde, receber um feedback sobre o check-up realizado e contar com a ajuda do médico e de equipe multidisciplinar para dar continuidade no cuidado com a saúde e receber orientações sobre a frequência adequada para a repetição dos exames realizados.'
    ],
    imageSrc: 'assets/img/monitoramento-checkup.jpg',
    removeLine: false,
    objectFit: 'cover',
});
// Sem uso atualmente

export const gerenciamentoDeDoencasCronicas: InfoSectionModel = new InfoSectionModel({
    smallTitle: 'PERSONAL SYSTEM',
    bigTitle: 'Prevenção de Doenças Cardiovasculares',
    subDescriptions: [
        'Os beneficiários têm acesso a diversos benefícios como verba academia, parcerias com empresas de alimentos saudáveis e grupos de corrida, realização de exame que mede a taxa metabólica de repouso, avaliação da composição corporal por bioimpedância, 5º mês de medicamento gratuito, auxílio para aquisição de insulina.',
        'O atendimento é realizado por uma equipe multidisciplinar na Care Plus Clinic, na rede credenciada e diretamente nas empresas.',
        'Após a avaliação com médicos endocrinologistas, os beneficiários serão encaminhados para acompanhamento presencial com nutricionista e psicóloga, além de consultoras de saúde à distância para orientações e auxílio sobre dúvidas e suporte para o atingimento das metas de saúde.',
        'Além disto, para comodidade, os beneficiários contam com atendimento online de nutricionistas e psicólogos.'
    ],
    imageSrc: 'assets/img/gerenciamento-doencas-cronicas.jpg',
    removeLine: false,
    objectFit: 'cover',
    reverse: true,
    htag: 'h2'
});

export const gestaoDeSaudeSection: IconCardsSectionModel = new IconCardsSectionModel({
    smallTitle: 'GESTÃO DE SAÚDE',
    bigTitle: 'Conheça nossos programas e serviços',
    subDescription: 'Fique por dentro de tudo o que a Care Plus oferece para proporcionar a melhor experiência em saúde.',
    button: new ButtonModel({
        text: 'Veja todos os Programas de Saúde',
        routerLink: '/planos-e-produtos/gestao-de-saude'
    }),
    cards: PersonalizedSectionCards,
    columnClass: 'is-4-desktop',
    htag: 'h3'
});
