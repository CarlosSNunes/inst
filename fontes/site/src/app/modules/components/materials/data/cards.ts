import { ButtonModel, CardModel } from 'src/app/models';

export default [
    new CardModel({
        type: 'default',
        title: 'Teleatendimento - Albert Einstein',
        button: new ButtonModel({
            link: 'assets/documents/teleatendimento-Albert-Einstein.pdf',
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Teleatendimento - Amparo',
        button: new ButtonModel({
            link: 'assets/documents/teleatendimento-Amparo.pdf',
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Telepsicologia',
        button: new ButtonModel({
            link: 'assets/documents/telepsicologia.pdf',
        })
    }),
    new CardModel({
        type: 'default',
        title: 'Vidalink',
        button: new ButtonModel({
            link: 'assets/documents/vidalink.pdf',
        })
    }),
]