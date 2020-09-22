import { DifferentialModel } from "src/app/models";

export const differentialsMock = [
    new DifferentialModel({
        title: "Consulta Garantida",
        content: "m alguns planos e regiões, a Care Plus garante aos beneficiários consultas de determinadas especialidades em até 72 horas",
        active: false,
        image: "assets/img/acesso-a-ferramentas-digitais.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Care Plus Travel",
        content: "Nossa proteção de até US$ 300.000,00 garante atendimento aos beneficiários que estão em viagem pelo exterior.",
        active: false,
        image: "assets/img/consultas-e-exames.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Saúde em Casa",
        content: "A Care Plus proporciona aos seus beneficiários consultas domiciliares nas especialidades de pediatria e clínica geral.",
        active: false,
        image: "assets/img/comprometimento-com-prazos.jpg",
        time: 10000
    }),
    new DifferentialModel({
        title: "Coleta de Exames",
        content: "Os beneficiários podem solicitar a coleta domiciliar de material para exames laboratoriais em domicílio.",
        active: true,
        image: "assets/img/vantagens-excepcionais.jpg",
        time: 10000
    }),
];
