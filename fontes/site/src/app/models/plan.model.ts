export class PlanModel {
    constructor(init?: Partial<PlanModel>) {
        Object.assign(this, init);
    }

    name: string;
    id: string;
    subTitle: string;
    description: string;
    linkId: string;
}