import { Unity, UnityAddress, UnityPeriod } from 'src/app/models';

export default [
    new Unity({
        id: 'unidadeCenu',
        nome: 'Agenda Unidade Cenu',
        descricao: 'Atendimento de Clínico Geral - São Paulo',
        fechada: false,
        telefone: '11 2424-6970',
        telefoneSemFormatacao: '1124246970',
        endereco: new UnityAddress({
            endereco: 'Av. das Nações Unidas, 12.901 - 9º andar – conj. 901– Bloco C - Torre Oeste - Centro Empresarial Nações Unidas',
            bairro: 'São Paulo',
            municipio: 'São Paulo'
        }),
        periodos: [
            new UnityPeriod({
                nome: 'Manha',
                descricaoHoras: '9h - 11h'
            }),
            new UnityPeriod({
                nome: 'Tarde',
                descricaoHoras: '14h - 15h'
            }),
            new UnityPeriod({
                nome: 'Noite',
                descricaoHoras: '22h - 00h'
            }),
        ]
    }),
    new Unity({
        id: 'unidadeFleury',
        nome: 'Agenda Unidade Fleury',
        descricao: 'Atendimento de Clínico Geral - São Paulo',
        fechada: false,
        telefone: '11 2344-1686',
        telefoneSemFormatacao: '1123441686',
        endereco: new UnityAddress({
            endereco: 'Av. Juscelino Kubitscheck, 1117- Vila Nova Conceição',
            bairro: 'São Paulo',
            municipio: 'São Paulo'
        }),
        periodos: [
            new UnityPeriod({
                nome: 'Manha',
                descricaoHoras: '9h - 11h'
            }),
            new UnityPeriod({
                nome: 'Tarde',
                descricaoHoras: '14h - 15h'
            }),
            new UnityPeriod({
                nome: 'Noite',
                descricaoHoras: '22h - 00h'
            }),
        ]
    }),
    new Unity({
        id: 'unidadeVilaOlimpia',
        nome: 'Agenda Unidade Vila Olímpia',
        descricao: 'Atendimento de Clínico Geral - São Paulo',
        fechada: true,
        telefone: '11 2344-1686',
        telefoneSemFormatacao: '1123441686',
        endereco: new UnityAddress({
            endereco: 'Rua Fidência Ramos, 302 – 12º andar – Torre B – Vila Olímpia',
            bairro: 'São Paulo',
            municipio: 'São Paulo'
        }),
        periodos: [
            new UnityPeriod({
                nome: 'Manha',
                descricaoHoras: '9h - 11h'
            }),
            new UnityPeriod({
                nome: 'Tarde',
                descricaoHoras: '14h - 15h'
            }),
            new UnityPeriod({
                nome: 'Noite',
                descricaoHoras: '22h - 00h'
            }),
        ]
    })
]