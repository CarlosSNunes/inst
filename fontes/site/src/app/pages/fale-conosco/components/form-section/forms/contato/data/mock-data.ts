import { ListaTipoAssuntoFaleConosco, TipoAssunto, Assunto } from 'src/app/models';

export const Types = new ListaTipoAssuntoFaleConosco({
    CodigoMensagem: 0,
    Mensagem: 'sucesso',
    TipoAssunto: [
        new TipoAssunto({
            Id: 1,
            Descricao: 'Beneficiário',
            Assunto: [
                new Assunto({
                    Id: 1,
                    Titulo: 'Sugestão'
                }),
                new Assunto({
                    Id: 2,
                    Titulo: 'Reclamação'
                }),
                new Assunto({
                    Id: 3,
                    Titulo: 'Elogio'
                }),
                new Assunto({
                    Id: 4,
                    Titulo: 'Dividas'
                }),
                new Assunto({
                    Id: 5,
                    Titulo: 'Informação'
                })
            ]
        }),
        new TipoAssunto({
            Id: 2,
            Descricao: 'Rh',
            Assunto: [
                new Assunto({
                    Id: 1,
                    Titulo: 'Sugestão'
                }),
                new Assunto({
                    Id: 2,
                    Titulo: 'Reclamação'
                }),
                new Assunto({
                    Id: 3,
                    Titulo: 'Elogio'
                }),
                new Assunto({
                    Id: 4,
                    Titulo: 'Dividas'
                }),
                new Assunto({
                    Id: 5,
                    Titulo: 'Informação'
                })
            ]
        }),
        new TipoAssunto({
            Id: 3,
            Descricao: 'Credenciado Medicina',
            Assunto: [
                new Assunto({
                    Id: 1,
                    Titulo: 'Sugestão'
                }),
                new Assunto({
                    Id: 2,
                    Titulo: 'Reclamação'
                }),
                new Assunto({
                    Id: 3,
                    Titulo: 'Elogio'
                }),
                new Assunto({
                    Id: 4,
                    Titulo: 'Dividas'
                }),
                new Assunto({
                    Id: 5,
                    Titulo: 'Informação'
                })
            ]
        }),
        new TipoAssunto({
            Id: 4,
            Descricao: 'Credenciado Odontologia',
            Assunto: [
                new Assunto({
                    Id: 1,
                    Titulo: 'Sugestão'
                }),
                new Assunto({
                    Id: 2,
                    Titulo: 'Reclamação'
                }),
                new Assunto({
                    Id: 3,
                    Titulo: 'Elogio'
                }),
                new Assunto({
                    Id: 4,
                    Titulo: 'Dividas'
                }),
                new Assunto({
                    Id: 5,
                    Titulo: 'Informação'
                })
            ]
        }),
        new TipoAssunto({
            Id: 5,
            Descricao: 'Corretor',
            Assunto: [
                new Assunto({
                    Id: 1,
                    Titulo: 'Sugestão'
                }),
                new Assunto({
                    Id: 2,
                    Titulo: 'Reclamação'
                }),
                new Assunto({
                    Id: 3,
                    Titulo: 'Elogio'
                }),
                new Assunto({
                    Id: 4,
                    Titulo: 'Dividas'
                }),
                new Assunto({
                    Id: 5,
                    Titulo: 'Informação'
                })
            ]
        }),
        new TipoAssunto({
            Id: 6,
            Descricao: 'Marketing e ou Imprensa',
            Assunto: [
                new Assunto({
                    Id: 1,
                    Titulo: 'Sugestão'
                }),
                new Assunto({
                    Id: 2,
                    Titulo: 'Reclamação'
                }),
                new Assunto({
                    Id: 3,
                    Titulo: 'Elogio'
                }),
                new Assunto({
                    Id: 4,
                    Titulo: 'Dividas'
                }),
                new Assunto({
                    Id: 5,
                    Titulo: 'Informação'
                })
            ]
        }),
        new TipoAssunto({
            Id: 7,
            Descricao: 'Visita',
            Assunto: [
                new Assunto({
                    Id: 1,
                    Titulo: 'Sugestão'
                }),
                new Assunto({
                    Id: 2,
                    Titulo: 'Reclamação'
                }),
                new Assunto({
                    Id: 3,
                    Titulo: 'Elogio'
                }),
                new Assunto({
                    Id: 4,
                    Titulo: 'Dividas'
                }),
                new Assunto({
                    Id: 5,
                    Titulo: 'Informação'
                })
            ]
        })
    ]
})