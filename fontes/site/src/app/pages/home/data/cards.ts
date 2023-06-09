import { IconCardModel } from 'src/app/models'

export default [
    new IconCardModel({
        "type": "icon",
        "title": "Programas Preventivos",
        "description": "A Care Plus oferece diversos programas preventivos de saúde e acompanhamento, uma vida saudável.",
        "imagePath": "assets/svg/shield.svg",
        "routerLink": "/a-careplus/gestao-de-saude/programas-preventivos"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Serviços On-line",
        "description": "Os beneficiários podem aproveitar alguns serviços a distância com a qualidade, o carinho e o cuidado que só a Care Plus tem.",
        "imagePath": "assets/svg/monitor-screen.svg",
        "backgroundColorClass": "white-background-color",
        "routerLink": "/a-careplus/gestao-de-saude/servicos-online"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Personal System",
        "description": "A Care Plus oferece consultas em clínicas próprias com médicos, nutricionistas e psicólogos. Conheça os programas.",
        "imagePath": "assets/svg/doctor.svg",
        "routerLink": "/a-careplus/gestao-de-saude/personal-system"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Programas Empresariais",
        "description": "A Care Plus disponibiliza  médicos, nutricionistas, enfermeiras e psicólogos para realizar atendimento no ambiente das empresas.",
        "imagePath": "assets/svg/doctorphone.svg",
        "routerLink": "/a-careplus/gestao-de-saude/programas-empresariais"
    })
]