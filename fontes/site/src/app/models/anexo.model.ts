export class Anexo {
    constructor(init?: Partial<Anexo>) {
        Object.assign(this, init);
    }

    FileBytes: string; // base64 em string do arquivo
    FileName: string;
}