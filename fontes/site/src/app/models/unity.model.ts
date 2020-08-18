export class Unity {
    constructor(init?: Partial<Unity>) {
        Object.assign(this, init);
    }

    id: any;
    nome: string;
    descricao: string;
    fechada: boolean = false;
    endereco: UnityAddress;
    telefone: string;
    telefoneSemFormatacao: string;
    periodos: UnityPeriod[] = [];
}


export class UnityAddress {
    constructor(init?: Partial<UnityAddress>) {
        Object.assign(this, init);
    }
    endereco: string;
    bairro: string;
    municipio: string;
}

export class UnityPeriod {
    constructor(init?: Partial<UnityPeriod>) {
        Object.assign(this, init);
    }

    nome: string;
    descricaoHoras: string;
}