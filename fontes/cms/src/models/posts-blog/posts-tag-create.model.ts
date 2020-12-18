export class PostsTagCreateModel {
    public constructor(init?: Partial<PostsTagCreateModel>) {
        Object.assign(this, init);
    }

    tagId: number;
    id: number;
}
