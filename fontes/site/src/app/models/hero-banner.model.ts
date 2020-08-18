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
    subTitle: string = '';
    button: ButtonModel;
    isFullScreen: boolean = false;
    hasAnchor: boolean = false;
    contentContainerMaxWidth: number = 1280;
}