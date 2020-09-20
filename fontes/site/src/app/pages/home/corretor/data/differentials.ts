import { DifferentialModel } from "src/app/models";

export const differentialsMock = [
    new DifferentialModel({
        title: "Gestão de teste",
        content: "Programas e serviços especiais oferecídos aos beneficiários Care Plus pensando sempre na saúde e conforto de nossos parceiros",
        active: true,
        image: "assets/img/gestao-de-saude.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Acolhimento",
        content: "Programas e serviços especiais oferecídos aos beneficiários Care Plus pensando sempre na saúde e conforto de nossos parceiros",
        active: false,
        image: "assets/img/acolhimento.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Humanização",
        content: "Programas e serviços especiais oferecídos aos beneficiários Care Plus pensando sempre na saúde e conforto de nossos parceiros",
        active: false,
        image: "assets/img/humanizacao.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Atendimento",
        content: "Programas e serviços especiais oferecídos aos beneficiários Care Plus pensando sempre na saúde e conforto de nossos parceiros",
        active: false,
        image: "assets/img/atendimento.jpg",
        time: 10000
    })
];
