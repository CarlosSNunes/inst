import { CardModel, ButtonModel } from 'src/app/models';

export default [
    {
        type: 'default',
        title: 'Cartilha da ANS por Care Plus',
        button: new ButtonModel({
            link: 'assets/documents/careplusresulfin2018.pdf'
        }),
        category: 'beneficiario'
    },
    {
        type: 'default',
        title: 'Tabela comparativa de produtos e planos Care Plus',
        button: new ButtonModel({
            link: 'assets/documents/careplusresulfin2019.pdf',
        }),
        category: 'gestor'
    },
] as Array<CardModel>;