export class DifferentialModel {
    constructor(init?: Partial<DifferentialModel>) {
        Object.assign(this, init);
    }

    title: string;
    content: string;
    active?: boolean;
    image: string;
    time: number;
}