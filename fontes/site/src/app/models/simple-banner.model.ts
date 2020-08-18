import { BreadcrumbModel } from './breadcrumb.model';

export class SimpleBannerModel {
    constructor(init?: Partial<SimpleBannerModel>) {
        Object.assign(this, init);
    }

    title?: string = '';
    description?: string = '';
    image?: string = '';
    hasAnchor?: boolean = false;
    breadcrumbs?: BreadcrumbModel[] = [];
    hasFilters?: boolean = false;
}