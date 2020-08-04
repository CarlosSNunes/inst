import { VideoModel } from './video.model';
import { BreadcrumbModel } from './breadcrumb.model';
import { ButtonModel } from './button.model';

export class HeroBannerModel {
    public constructor(init?: Partial<HeroBannerModel>) {
        Object.assign(this, init);
    }

    video: VideoModel;
    breadcrumbs: BreadcrumbModel[] = [];
    bigTitle: string = '';
    button: ButtonModel;
    hasAnchor: boolean = false;
}