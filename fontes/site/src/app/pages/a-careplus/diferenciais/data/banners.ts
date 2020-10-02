import { BannerModel } from 'src/app/models';

export const bannersMock = [
    new BannerModel({
        caminhoImagem:
            'assets/img/Benner_Diferenciais_Acolhimento.png',
        titulo: 'Entregar um Atendimento 360 e gerar muita confiança entre os Beneficiários é a chave do sucesso',
        descricao: 'Para a Care Plus, atender bem é muito mais do que ser cordial. Ter honestidade e tratar o próximo com educação é um dever',
        slideAtual: true,
        tempo: 10000
    }),
    new BannerModel({
        caminhoImagem:
            'assets/img/Benner_Diferenciais_Atendimento.png',
        titulo: 'Estar sempre próximo aos beneficiários e parceiros é um dos valores mais importantes para nós',
        descricao: 'O acolhimento faz parte da nossa essência e assumimos a responsabilidade de cuidar da sua saúde e de quem você ama. Aqui, você nunca estará sozinho',
        tempo: 5000
    }),
    new BannerModel({
        caminhoImagem:
            'assets/img/Benner_Diferenciais_Humanizacao.png',
        titulo: 'Cuidado, carinho e tratamento humanizado são a nossa marca',
        descricao: 'O lado humano é nossa maior marca. Dedicamos os nossos esforços para que todos tenham uma vida mais saudável e feliz',
        tempo: 5000
    })
];