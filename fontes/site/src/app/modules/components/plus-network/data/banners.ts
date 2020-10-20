import { BannerModel } from 'src/app/models';

export default [
    new BannerModel({
        caminhoImagem: "assets/img/medicos-referencia.png",
        caminhoDesktop: "assets/img/medicos-referencia.png",
        caminhoMobile: "assets/img/medicos-referencia.png",
        tag: "Médicos Referência",
        titulo: "Experiência técnica e Currículo de excelência",
        descricao: "Nossa rede é composta por um time de médicos referência em suas especialidades, para garantir a melhor experiência médica. Sua saúde como prioridade.",
        slideAtual: true,
        tempoExibicao: 5000
    }),
    new BannerModel({
        caminhoImagem: "assets/img/clinicas-tecnologicas.png",
        caminhoDesktop: "assets/img/clinicas-tecnologicas.png",
        caminhoMobile: "assets/img/clinicas-tecnologicas.png",
        tag: "Clinicas Tecnológicas",
        titulo: "Clinicas modernas e diferenciadas",
        descricao: "Selecionamos as melhores estruturas clinicas dentro da Rede Plus. Pois queremos oferecer o melhor serviço, os melhores programas e o melhor atendimento de modo humanizado e acolhedor.",
        tempoExibicao: 5000
    }),
    new BannerModel({
        caminhoImagem: "assets/img/cobertura-total.jpg",
        caminhoDesktop: "assets/img/cobertura-total.jpg",
        caminhoMobile: "assets/img/cobertura-total.jpg",
        tag: "Cobertura Total",
        titulo: "Os melhores médicos do Brasil em nossa Rede Plus",
        descricao: "Faça sua consulta com nosso time exclusivos de médicos que são referência dentro de suas especialidades. Experiência alto padrão com nível máximo de satisfação dentro do plano.",
        tempoExibicao: 5000
    }),
    new BannerModel({
        caminhoImagem: "assets/img/atendimento-personalizado.jpg",
        caminhoDesktop: "assets/img/atendimento-personalizado.jpg",
        caminhoMobile: "assets/img/atendimento-personalizado.jpg",
        tag: "Atendimento Personalizado",
        titulo: "Tenha a melhor experiência em saúde do mercado",
        descricao: "Com nossa rede credenciada exclusiva que visa garantir satisfação elevada e experiência única. Vamos cuidar de seu bem mais precioso? Sua vida, sua saúde, seu bem-estar.",
        tempoExibicao: 5000
    })
]
