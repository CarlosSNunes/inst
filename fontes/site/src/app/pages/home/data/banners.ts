import { BannerModel } from "src/app/models";

export const bannersMock = [
     new BannerModel({
        caminhoImagem: "assets/videos/CP-nova-identidade.gif",
        titulo: "Uma nova marca!",
        descricao: "A mesma paixão e dedicação em cuidar de pessoas! #todosnamesmabatida",
        tempo: 11000,
    }),
    new BannerModel({
        caminhoImagem: "assets/img/banner-home.jpg",
        titulo: "O cuidado com a sua saúde, no conforto de sua casa",
        descricao:
            "Com o Saúde em Casa, a Care Plus proporciona aos seus beneficiários consultas domiciliares nas especialidades de pediatria e clínico geral. ",
        slideAtual: true,
        tempo: 10000,
        linkExterno: "#",
    })
];
