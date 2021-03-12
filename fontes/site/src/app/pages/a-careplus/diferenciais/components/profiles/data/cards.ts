import { ButtonModel, CardModel } from 'src/app/models';

export default [
    new CardModel({
        type: 'default',
        title: 'Consulta Garantida',
        description: 'Em alguns planos e regiões, a Care Plus garante aos beneficiários consultas de determinadas especialidades em até 72 horas, sob pena de multa em caso de descumprimento.',
        category: 'beneficiario, rh',
        id: 'consulta-garantida'
    }),
    new CardModel({
        type: 'default',
        title: 'Rede de Suporte',
        description: 'Exclusivo para alguns planos e sem custo adicional, este programa disponibiliza uma equipe médica dedicada para atendimento de algumas especialidades no hospital Albert Einstein.',
        category: 'beneficiario, rh, corretor',
        id: 'rede-de-suporte'
    }),
    new CardModel({
        type: 'default',
        title: 'Care Plus Travel',
        description: 'Viajar em segurança e tranquilidade é possível com a cobertura internacional da Care Plus. A proteção de até US$ 300.000,00 garante atendimento aos beneficiários que estão em viagem pelo exterior.',
        category: 'beneficiario',
        id: 'careplus-travel',
        routerLink: '/planos-e-produtos/gestao-de-saude/programas-preventivos',
        fragment: 'checkup-do-viajante'
    }),
    new CardModel({
        type: 'default',
        title: 'Estatísticas Online',
        description: 'A Care Plus disponibiliza relatórios gerenciais eletrônicos e atualizados mensalmente com os resultados de utilização da empresa. Assim, os gestores de RH têm mais controle sobre o gerenciamento dos planos.',
        category: 'rh',
        id: 'estatisticas-online'
    }),
    new CardModel({
        type: 'default',
        title: 'Fatura Online',
        description: 'Os gestores de RH contam com uma ferramenta online, disponível no site da Care Plus, para geração de fatura mensal de prêmio e de coparticipação e ainda para emissão de boleto para pagamento.',
        category: 'rh, corretor, credenciado',
        id: 'fatura-online'
    }),
    new CardModel({
        type: 'default',
        title: 'Movimentações via Web',
        description: 'Na Care Plus, gerenciar os planos de saúde da empresa é mais simples e ágil. Os gestores de RH têm acesso a ferramentas online para fazer todas as movimentações sem grandes esforços.',
        category: 'rh, corretor',
        id: 'movimentacoes-via-web'
    }),
    new CardModel({
        type: 'default',
        title: 'Mental Health',
        description: 'O Mental Health é o programa de atendimento psicológico da Care Plus 24x7. Os beneficiários podem acionar a equipe de profissionais qualificados a qualquer momento.',
        category: 'beneficiario, rh, corretor',
        id: 'mental-health',
        routerLink: '/planos-e-produtos/gestao-de-saude/programas-preventivos',
        fragment: 'mental-health'
    }),
    new CardModel({
        type: 'default',
        title: 'Consultoria Especializada',
        description: 'A Care Plus disponibiliza consultores especializados para fazer a ponte com a corretora e auxiliar no esclarecimento de dúvidas e orientações facilitando o processo de vendas.',
        category: 'corretor',
        id: 'consultoria-especializada'
    }),
    new CardModel({
        type: 'default',
        title: 'Vacinas',
        description: 'Alguns planos possuem cobertura de vacinas. Os beneficiários que precisarem de imunização poderão comparecer a clínicas particulares para as aplicações das doses.',
        category: 'beneficiario, rh, corretor, credenciado',
        id: 'vacinas'
    }),
    new CardModel({
        type: 'default',
        title: 'Mommy Care',
        description: 'O Mommy Care é o programa da Care Plus dedicado para as gestantes. Durante toda a gravidez, as beneficiárias contam com acompanhamento personalizado.',
        category: 'beneficiario, rh, corretor',
        id: 'mommy-care',
        routerLink: '/planos-e-produtos/gestao-de-saude/programas-preventivos',
        fragment: 'mommy-care'
    }),
    new CardModel({
        type: 'default',
        title: 'Personal System',
        description: 'É um programa composto por equipe médica multidisciplinar especializada na promoção de saúde e prevenção de doenças com atendimento presencial e individualizado.',
        category: 'beneficiario, rh, corretor',
        id: 'personal-system',
        routerLink: '/planos-e-produtos/gestao-de-saude/perdonal-system',
    }),
    new CardModel({
        type: 'default',
        title: 'Atenção Primária',
        description: 'Neste diferencial, restrito ao plano Master I, a Care Plus, em parceria com o hospital Albert Einstein, oferece um programa de cuidado exclusiva levando em conta o histórico médico.',
        category: 'beneficiario, rh, corretor',
        id: 'atencao-primaria'
    }),
    new CardModel({
        type: 'default',
        title: 'Saúde em Casa',
        description: 'Com o Saúde em Casa, a Care Plus propicia aos seus beneficiários consultas domiciliares em domicílio nas especialidades de pediatria e clínico geral.',
        category: 'beneficiario, rh, corretor',
        id: 'saude-em-casa'
    }),
    new CardModel({
        type: 'default',
        title: 'Coleta de Exames',
        description: 'Com este serviço, os beneficiários podem solicitar a coleta domiciliar de material para exames laboratoriais em domicílio. É mais um diferencial que proporciona comodidade.',
        category: 'beneficiario, rh, corretor, credenciado',
        id: 'coleta-de-exames'
    }),
    new CardModel({
        type: 'default',
        title: 'Nutri Mais',
        description: 'Além do programa de nutrição na empresa, a Care Plus estende os cuidados com a alimentação dos beneficiários oferecendo consultoria para ajudar os gestores de RH a encontrarem soluções para um ambiente mais saudável.',
        category: 'beneficiario, rh, corretor',
        id: 'nutri-mais',
        routerLink: '/planos-e-produtos/gestao-de-saude/servicos-online',
        fragment: 'nutri-a-distancia'
    }),
    new CardModel({
        type: 'default',
        title: 'Suporte na Implantação',
        description: 'A Care Plus facilita todo o processo de implantação do plano na empresa, seja no suporte à comunicação para os beneficiários ou na documentação necessária. O melhor para o gestor de RH.',
        category: 'rh, corretor',
        id: 'suporte-na-impantacao'
    }),
    new CardModel({
        type: 'default',
        title: 'Brokers Cup',
        description: 'Com o objetivo de prestigiar a relação com os corretores, a Care Plus promove a Brokers Cup, uma campanha de incentivo com prêmios exclusivos para parceiros que obtiveram excelente desempenho nas vendas.',
        category: 'corretor',
        id: 'brokers-cup'
    }),
    new CardModel({
        type: 'default',
        title: 'Acompanhamento',
        description: 'Os corretores parceiros da Care Plus podem verificar online as solicitações de inclusão e exclusão de beneficiários, informações ou documentações pendentes e status dos processos.',
        category: 'corretor',
        id: 'acompanhamento'
    })
]
