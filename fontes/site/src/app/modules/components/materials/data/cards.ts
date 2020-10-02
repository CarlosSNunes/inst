import { ButtonModel, CardModel } from 'src/app/models';

export default [
    new CardModel({
        type: 'default',
        title: 'ANS – Norma Técnica Nº 45',
        button: new ButtonModel({
            link: 'assets/documents/nota-tecnica-45.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'ANS – Cartilha de Exclusão de Beneficiário – RN 412',
        button: new ButtonModel({
            link: 'assets/documents/cartilha_cancelamento_ou_exclusao_de_contrato.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'ANS – Artigo 15 – RN 412',
        button: new ButtonModel({
            link: 'assets/documents/artigo15_rn412.pdf'
        })
    }),
    new CardModel({
        type: 'default',
        title: 'IDSS 2018',
        button: new ButtonModel({
            link: 'assets/documents/idsscareplus-2018.pdf'
        })
    }),
]