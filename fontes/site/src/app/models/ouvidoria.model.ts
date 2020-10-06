
export class BuscarAssuntoOuvidoriaSaida {
    constructor(init?: Partial<BuscarAssuntoOuvidoriaSaida>) {
        Object.assign(this, init);
    }

    Sucesso: boolean;
    Erros: any;
    Mensagem: string;
    Dados: Array<Assunto> = [];

}

class Assunto {
    constructor(init?: Partial<Assunto>) {
        Object.assign(this, init);
    }

    Id: number;
    TextoAssunto: string;
}


export class BuscarClassificacaoOuvidoriaSaida {
    constructor(init?: Partial<BuscarClassificacaoOuvidoriaSaida>) {
        Object.assign(this, init);
    }

    Sucesso: boolean;
    Erros: any;
    Mensagem: string;
    Dados: Array<Classificacao> = [];
}


class Classificacao {
    constructor(init?: Partial<Assunto>) {
        Object.assign(this, init);
    }

    Id: number;
    TextoClassificacao: string;
}

export class GravarOuvidoriaEntrada {
    constructor(init?: Partial<GravarOuvidoriaEntrada>) {
        Object.assign(this, init);
    }

    Origem: 'Partner' = 'Partner';
    // Token será preenchido pelo backend.
    Certificado: number;
    DDDTelefoneCelular: number;
    TelefoneCelular: number;
    DDDTelefoneResidencial: number;
    TelefoneResidencial: number;
    Email: string;
    IdAssunto: number;
    IdClassificacao: number;
    Mensagem: string;
    ProtocoloAtendimento?: string;
    Anexo: {
        Arquivo: File[]
    };
}


export class GravarOuvidoriaSaida {
    constructor(init?: Partial<GravarOuvidoriaSaida>) {
        Object.assign(this, init);
    }

    Protocolo: number;
    Erros: any;
    Sucesso: boolean;
}