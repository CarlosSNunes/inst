export class InstagramPostModel {
    public constructor(init?: Partial<InstagramPostModel>) {
        Object.assign(this, init);
    }

    url: string;
    link: string;
    type: string;
    alt: string;
    title: string;
}
