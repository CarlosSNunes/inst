import { Anexo } from './anexo.model';

export class GravarCanalDenunciaEntrada {
    constructor(init?: Partial<GravarCanalDenunciaEntrada>) {
        Object.assign(this, init);
    }

    Origem: 'Partner' = 'Partner';
    // Token será preenchido pelo backend.
    CPFCNPJ: number;
    Certificado: number;
    Mensagem: string;
    DDDTelefone: number;
    Telefone: number;
    DDDTelefoneCel: number;
    TelefoneCel: number;
    Email: string;
    NomeContato: string;
    // TokenAutenticacao deverá ser enviado pelo backend.
    lstAnexo: {
        AnexoByte: Array<Anexo>; // lista de arquivos.
    };
}

export class GravarCanalDenunciaSaida {
    constructor(init?: Partial<GravarCanalDenunciaSaida>) {
        Object.assign(this, init);
    }

    CodigoMensagem: number;
    Mensagem: string;
    sucesso: boolean;
}