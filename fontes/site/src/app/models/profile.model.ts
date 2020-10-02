export class Profile {
    constructor(init?: Partial<Profile>) {
        Object.assign(this, init);
    }

    title: string;
    description: string;
    link: string;
    image: string;
    linkTitle: string;
    active: boolean;
}
