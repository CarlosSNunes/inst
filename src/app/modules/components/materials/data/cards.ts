import { Button } from 'protractor';
import { ButtonModel } from 'src/app/models';

export default [
    {
        type: "default",
        title: "Cartilha da ANS por Care Plus",
        button: new ButtonModel({
            link: '#'
        })
    },
    {
        "type": "default",
        "title": "Tabela comparativa de produtos e planos Care Plus",
        button: new ButtonModel({
            link: '#'
        })
    },
    {
        type: "default",
        title: "Detalhes dos planos odontológicos",
        button: new ButtonModel({
            link: '#'
        })
    },
    {
        type: "default",
        title: "Certificado da ANS para rede credenciada",
        button: new ButtonModel({
            link: '#'
        })
    }
]