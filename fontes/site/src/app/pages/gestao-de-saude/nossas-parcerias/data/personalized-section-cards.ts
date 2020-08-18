import { IconCardModel } from 'src/app/models'

export default [
    new IconCardModel({
        type: "icon",
        title: "Programas <br/> preventivos",
        description: "A Care Plus oferece aos seus beneficiários diversos programas preventivos de saúde e acompanhamento para auxiliar seus beneficiários a ter uma vida melhor.",
        imagePath: "assets/svg/shield.svg"
    }),
    new IconCardModel({
        type: "icon",
        title: "Programas <br/> empresariais",
        description: "A Care Plus oferece alguns atendimentos de médicos, nutricionistas, enfermeiras e psicólogos na empresa clientes.",
        imagePath: "assets/svg/doctorphone.svg"
    }),
    new IconCardModel({
        type: "icon",
        title: "Serviços <br/> online",
        description: "Serviços  à distância com qualidade, carinho e cuidado que só a Care Plus tem com seus clientes.",
        imagePath: "assets/svg/monitor-screen.svg",
    }),
]