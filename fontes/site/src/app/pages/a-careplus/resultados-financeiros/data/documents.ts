import { CardModel, ButtonModel } from 'src/app/models';

export default [
    new CardModel({
        type: 'default',
        title: 'Resultados Financeiros de 2019',
        button: new ButtonModel({
            link: 'assets/documents/careplusresulfin2019.pdf',
        }),
        size: {
            placeholder: '(910kb)',
            file_size: '932.327'
        },
        category: '2019'
    }),
    new CardModel({
        type: 'default',
        title: 'Resultados Financeiros de 2018',
        button: new ButtonModel({
            link: 'assets/documents/careplusresulfin2018.pdf'
        }),
        size: {
            placeholder: '(1.2mb)',
            file_size: '1208744'
        },
        category: '2018'
    }),
];