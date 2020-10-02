import { IconCardModel } from 'src/app/models'

export default [
    new IconCardModel({
        "type": "icon",
        "title": "Programas <br/> Preventivos",
        "description": "A Care Plus oferece diversos programas preventivos de saúde e acompanhamento, uma vida saudável.",
        "imagePath": "assets/svg/shield.svg",
        "routerLink": "/planos-e-produtos/gestao-de-saude/programas-preventivos"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Programas <br/> Empresariais",
        "description": "A Care Plus disponibiliza  médicos, nutricionistas, enfermeiras e psicólogos para realizar atendimento no ambiente das empresas.",
        "imagePath": "assets/svg/doctorphone.svg",
        "routerLink": "/planos-e-produtos/gestao-de-saude/programas-empresariais"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Serviços <br/> Online",
        "description": "Os beneficiários podem aproveitar alguns serviços a distância com a qualidade, o carinho e o cuidado que só a Care Plus tem.",
        "imagePath": "assets/svg/monitor-screen.svg",
        "backgroundColorClass": "white-background-color",
        "routerLink": "/planos-e-produtos/gestao-de-saude/servicos-online"
    }),
];