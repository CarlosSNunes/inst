import { IconCardModel } from 'src/app/models'

export default [
    new IconCardModel({
        "type": "icon",
        "title": "Programas preventivos",
        "description": "A Care Plus oferece diversos programas preventivos de saúde e acompanhamento para que os beneficiários tenham uma vida saudável.",
        "imagePath": "assets/svg/shield.svg"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Serviços online",
        "description": "Os beneficiários podem aproveitar alguns serviços a distância com a qualidade, o carinho e o cuidado que só a Care Plus tem.",
        "imagePath": "assets/svg/monitor-screen.svg",
        "backgroundColorClass": "white-background-color"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Nossas parcerias",
        "description": "Com parcerias estratégicas e de alto nível, a Care Plus oferece o que há de melhor em saúde e bem estar para todos os seus beneficiários.",
        "imagePath": "assets/svg/doctor.svg"
    }),
    new IconCardModel({
        "type": "icon",
        "title": "Programas empresariais",
        "description": "A Care Plus disponibiliza  médicos, nutricionistas, enfermeiras e psicólogos para realizar atendimento no ambiente das empresas.",
        "imagePath": "assets/svg/doctorphone.svg"
    })
]