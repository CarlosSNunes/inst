import { Anexo } from './anexo.model';

export class FaleConoscoAutoFields {
    constructor(init?: Partial<FaleConoscoAutoFields>) {
        Object.assign(this, init);
    }

    plano: string = '';
    planoSaude: boolean = false;
    planoOdontologico: boolean = false;
    planoMedicinal: boolean = false;
}

export class ListaTipoAssuntoFaleConosco {
    constructor(init?: Partial<ListaTipoAssuntoFaleConosco>) {
        Object.assign(this, init);
    }

    CodigoMensagem: number;
    Mensagem: string;
    TipoAssunto: Array<TipoAssunto> = [];
}

export class TipoAssunto {
    constructor(init?: Partial<TipoAssunto>) {
        Object.assign(this, init);
    }

    Id: number;
    Descricao: string;
    Assunto: Array<Assunto> = [];
}

export class Assunto {
    constructor(init?: Partial<Assunto>) {
        Object.assign(this, init);
    }

    Id: number;
    Titulo: string;
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
    lstAnexo: {
        AnexoByte: Array<Anexo>; // lista de arquivos.
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