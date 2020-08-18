export class VacancyModel {
    constructor(init?: Partial<VacancyModel>) {
        Object.assign(this, init)
    }

    id: number;
    name: string;
    descriptions?: string[] = [];
    subDescriptions?: string[] = [];
    preRequisites?: string[] = [];
    extraDescriptions?: string[] = [];
}