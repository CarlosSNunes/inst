class NewsLetterModel{
    constructor(init?: Partial<NewsLetterModel>) {
        Object.assign(this, init)
    }

    nome: string;
    email: string;
}