import { CardModel, ButtonModel } from 'src/app/models';

export default [
    new CardModel({
        type: 'default',
        title: 'Resultados Financeiros de 2019',
        button: new ButtonModel({
            link: 'assets/documents/careplusresulfin2019.pdf',
        }),
        category: '2019'
    }),
    new CardModel({
        type: 'default',
        title: 'Resultados Financeiros de 2018',
        button: new ButtonModel({
            link: 'assets/documents/careplusresulfin2018.pdf'
        }),
        category: '2018'
    }),
];