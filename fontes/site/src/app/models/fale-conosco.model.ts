
export class FaleConoscoAutoFields {
    constructor(init?: Partial<FaleConoscoAutoFields>) {
        Object.assign(this, init);
    }

    plano: string = '';
    planoSaude: boolean = false;
    planoOdontologico: boolean = false;
    medicinaOcupacional: boolean = false;
}

export class ListaTipoAssuntoFaleConosco {
    constructor(init?: Partial<ListaTipoAssuntoFaleConosco>) {
        Object.assign(this, init);
    }

    codigoMensagem: number;
    mensagem: string;
    tipoAssunto: Array<TipoAssunto> = [];
}

export class TipoAssunto {
    constructor(init?: Partial<TipoAssunto>) {
        Object.assign(this, init);
    }

    id: number;
    descricao: string;
    assunto: Array<Assunto> = [];
}

export class Assunto {
    constructor(init?: Partial<Assunto>) {
        Object.assign(this, init);
    }

    id: number;
    titulo: string;
}


export class GravarFaleConoscoEntrada {
    constructor(init?: Partial<GravarFaleConoscoEntrada>) {
        Object.assign(this, init);
    }

    Origem: 'Partner' = 'Partner';
    // Token será preenchido pelo backend.
    Assunto: number;
    CPFCNPJ: number;
    Certificado: number;
    CodigoCarePlus: number;
    Comentario: string;
    DDDTelefone1: number;
    Telefone1: number;
    DDDTelefone2: number;
    Telefone2: number;
    Email: string;
    IdTipo: number;
    NomeContato: string;
    // TokenAutenticacao deverá ser enviado pelo backend.
    NomeEntidade: string; // necerrário somente em casos diferentes do tipo Beneficiário.
    LstAnexo: {
        Arquivo: Array<File>; // lista de arquivos.
    };
}


export class GravarFaleConoscoSaida {
    constructor(init?: Partial<GravarFaleConoscoSaida>) {
        Object.assign(this, init);
    }

    CodigoMensagem: number;
    Mensagem: string;
    sucesso: boolean;
}