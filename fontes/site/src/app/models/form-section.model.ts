import { BreadcrumbModel } from './breadcrumb.model';

export class FormSectionModel {
    constructor(init?: Partial<FormSectionModel>) {
        Object.assign(this, init);
    }

    title: string;
    id: number;
    active: boolean;
    slug: string;
    breadcrumbs: BreadcrumbModel[] = [];
}