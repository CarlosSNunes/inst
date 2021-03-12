class NewsLetterModel{
    constructor(init?: Partial<NewsLetterModel>) {
        Object.assign(this, init)
    }

    nomeCompleto: string;
    email: string;
}