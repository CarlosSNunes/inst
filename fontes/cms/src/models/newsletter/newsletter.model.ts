export class NewsletterModel {
    public constructor(init?: Partial<NewsletterModel>) {
        Object.assign(this, init);
    }

    id: number;
    nomeCompleto: string;
    email: string;
    dataCadastro: Date;
}
