import { BuscarAssuntoOuvidoriaSaida, BuscarClassificacaoOuvidoriaSaida } from 'src/app/models';

export const AssuntoOuvidoria: BuscarAssuntoOuvidoriaSaida = new BuscarAssuntoOuvidoriaSaida({
    Sucesso: true,
    Mensagem: '',
    Erros: '',
    Dados: [
        {
            Id: 167,
            TextoAssunto: 'Autorização de Atendimento'
        },
        {
            Id: 168,
            TextoAssunto: 'Central de Atendimento'
        },
        {
            Id: 169,
            TextoAssunto: 'Consultor de Relacionamento'
        },
        {
            Id: 170,
            TextoAssunto: 'Outros'
        },
        {
            Id: 171,
            TextoAssunto: 'Prévia de Reembolso'
        },
        {
            Id: 172,
            TextoAssunto: 'Reanálise de Reembolso'
        },
        {
            Id: 173,
            TextoAssunto: 'Rede Credenciada'
        },
        {
            Id: 174,
            TextoAssunto: 'Reembolso'
        }
    ]
});

export const ClassificacaoOuvidoria: BuscarClassificacaoOuvidoriaSaida = new BuscarClassificacaoOuvidoriaSaida({
    Sucesso: true,
    Mensagem: '',
    Erros: '',
    Dados: [
        {
            Id: 1,
            TextoClassificacao: 'Informação'
        },
        {
            Id: 2,
            TextoClassificacao: 'Reclamação'
        },
        {
            Id: 3,
            TextoClassificacao: 'Sugestão'
        },
    ]
});