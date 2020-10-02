export class VideoModel {
    public constructor(init?: Partial<VideoModel>) {
        Object.assign(this, init);
    }

    url: string;
    type: string;
    poster: string;
    subtitles?: SubtitleModel[];
}

export class SubtitleModel {
    public constructor(init?: Partial<SubtitleModel>) {
        Object.assign(this, init);
    }

    label: string;
    url: string;
    srclang: string;
    default: boolean = false;
}
