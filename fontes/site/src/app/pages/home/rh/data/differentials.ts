import { DifferentialModel } from "src/app/models";

export const differentialsMock = [
    new DifferentialModel({
        title: "Gestão de Saúde",
        content: "A Gestão de Saúde conta com programas e serviços de saúde especiais feitos na medida para você. Desde ações preventivas até descontos em empresas de alimentação saudável e consultoria esportiva.",
        active: true,
        image: "assets/img/gestao-de-saude.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Acolhimento",
        content: "O acolhimento faz parte da nossa essência e assumimos a responsabilidade de cuidar da sua saúde e de quem você ama. Aqui, você nunca estará sozinho.",
        active: false,
        image: "assets/img/acolhimento.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Humanização",
        content: "O lado humano é nossa maior marca. Para a Care Plus os laços verdadeiros contam muito e, por isso, procuramos manter relacionamentos próximos com beneficiários, empresas, corretores e credenciados.",
        active: false,
        image: "assets/img/humanizacao.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Atendimento",
        content: "O atendimento faz parte de toda a experiência em saúde que a gente oferece com os nossos programas exclusivos, ampla rede credenciada e facilidades digitais.",
        active: false,
        image: "assets/img/atendimento.jpg",
        time: 10000
    })
];
