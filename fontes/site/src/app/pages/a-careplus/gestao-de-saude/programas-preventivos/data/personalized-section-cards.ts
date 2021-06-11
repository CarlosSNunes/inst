import { IconCardModel } from 'src/app/models'

export default [
    new IconCardModel({
        "type": "icon",
        "title": "Personal <br/> System",
        "description": "Fique por dentro de tudo o que a Care Plus oferece para proporcionar a melhor experiência em saúde.",
        "imagePath": "assets/svg/shield.svg",
        "routerLink": "/a-careplus/gestao-de-saude/personal-system"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Programas <br/> Empresariais",
        "description": "A Care Plus disponibiliza  médicos, nutricionistas, enfermeiras e psicólogos para realizar atendimento no ambiente das empresas.",
        "imagePath": "assets/svg/doctorphone.svg",
        "routerLink": "/a-careplus/gestao-de-saude/programas-empresariais"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Serviços <br/> Online",
        "description": "Os beneficiários podem aproveitar alguns serviços a distância com a qualidade, o carinho e o cuidado que só a Care Plus tem.",
        "imagePath": "assets/svg/monitor-screen.svg",
        "backgroundColorClass": "white-background-color",
        "routerLink": "/a-careplus/gestao-de-saude/servicos-online"
    }),
];