import { CardModel } from 'src/app/models';

export default [
    new CardModel({
        type: 'default',
        title: 'Consulta Garantida',
        description: 'Em alguns planos e regiões, a Care Plus garante aos beneficiários consultas de determinadas especialidades em até 72 horas, sob pena de multa em caso de descumprimento.',
        category: 'beneficiario',
        id: 'consulta-garantida'
    }),
    new CardModel({
        type: 'default',
        title: 'Rede de Suporte',
        description: 'Exclusivo para alguns planos e sem custo adicional, este programa disponibiliza uma equipe médica dedicada para atendimento de algumas especialidades no hospital Albert Einstein.',
        category: 'beneficiario',
        id: 'rede-de-suporte'
    }),
    new CardModel({
        type: 'default',
        title: 'Care Plus Travel',
        description: 'Viajar em segurança e tranquilidade é possível com a cobertura internacional da Care Plus. A proteção de até US$ 300.000,00 garante atendimento aos beneficiários que estão em viagem pelo exterior.',
        category: 'beneficiario',
        id: 'careplus-travel'
    })
]