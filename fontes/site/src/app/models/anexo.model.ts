export class Anexo {
    constructor(init?: Partial<Anexo>) {
        Object.assign(this, init);
    }

    FileBytes: Buffer;
    FileName: string;
}