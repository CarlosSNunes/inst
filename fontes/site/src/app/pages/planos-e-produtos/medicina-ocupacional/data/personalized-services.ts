import { IconCardModel } from 'src/app/models';

export default [
    new IconCardModel({
        type: 'icon',
        title: 'PPRA',
        description: 'Programa de Prevenção de Riscos Ambientais, regulamentado pela, NR - 9 que identifica e avalia o controle de riscos ambientais existentes ou que venham a existir no ambiente de trabalho, sejam eles físicos ou mentais.',
        imagePath: 'assets/svg/helmet.svg'
    }),
    new IconCardModel({
        type: 'icon',
        title: 'PCMSO',
        description: 'Programa de Controle Médico de Saúde Ocupacional, regulamentado pela NR – 7, que tem como objetivo normatizar o que se refere à saúde do funcionário em ambiente laboral.',
        imagePath: 'assets/svg/heart.svg'
    }),
    new IconCardModel({
        type: 'icon',
        title: 'ASO',
        description: 'O Atestado de Saúde Ocupacional (ASO) apresenta informações sobre a saúde do trabalhador, definindo se ele está apto (ou não) a ser admitido, demitido ou promovido para outra função.',
        imagePath: 'assets/svg/clipboard.svg'
    })
]