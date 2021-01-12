import { CardModel, ButtonModel } from 'src/app/models';

export default [
    new CardModel({
        type: 'default',
        title: 'Cartilha da ANS por Care Plus',
        button: new ButtonModel({
            link: 'assets/documents/careplusresulfin2018.pdf'
        }),
        size: {
            placeholder: '(1.2mb)',
            file_size: '1208744'
        },
        category: 'beneficiario'
    }),
    new CardModel({
        type: 'default',
        title: 'Tabela comparativa de produtos e planos Care Plus',
        button: new ButtonModel({
            link: 'assets/documents/careplusresulfin2019.pdf',
        }),
        size: {
            placeholder: '(910kb)',
            file_size: '932.327'
        },

        category: 'gestor'
    }),
];