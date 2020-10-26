
export class BuscarAssuntoOuvidoriaSaida {
    constructor(init?: Partial<BuscarAssuntoOuvidoriaSaida>) {
        Object.assign(this, init);
    }

    sucesso: boolean;
    erros: any;
    mensagem: string;
    dados: Array<Assunto> = [];

}

class Assunto {
    constructor(init?: Partial<Assunto>) {
        Object.assign(this, init);
    }

    id: number;
    textoAssunto: string;
}


export class BuscarClassificacaoOuvidoriaSaida {
    constructor(init?: Partial<BuscarClassificacaoOuvidoriaSaida>) {
        Object.assign(this, init);
    }

    sucesso: boolean;
    erros: any;
    mensagem: string;
    dados: Array<Classificacao> = [];
}


class Classificacao {
    constructor(init?: Partial<Assunto>) {
        Object.assign(this, init);
    }

    id: number;
    textoClassificacao: string;
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
    CPF: string;
    Nome: string;
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