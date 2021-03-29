import { ButtonModel, CardModel } from 'src/app/models';

export default [
    new CardModel({
        type: 'default',
        title: 'Teleatendimento - Albert Einstein',
        button: new ButtonModel({
            link: 'assets/documents/teleatendimento-Albert-Einstein.pdf',
        }),
        size: {
            placeholder: '(784kb)',
            file_size: '803777'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Teleatendimento - Amparo',
        button: new ButtonModel({
            link: 'assets/documents/teleatendimento-Amparo.pdf',
        }),
        size: {
            placeholder: '(568kb)',
            file_size: '582114'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Telepsicologia',
        button: new ButtonModel({
            link: 'assets/documents/telepsicologia.pdf',
        }),
        size: {
            placeholder: '(12,4mb)',
            file_size: '13053410'
        }
    }),
    new CardModel({
        type: 'default',
        title: 'Vidalink',
        button: new ButtonModel({
            link: 'assets/documents/vidalink.pdf',
        }),
        size: {
            placeholder: '(1,36mb)',
            file_size: '1428546'
        }
    }),
]