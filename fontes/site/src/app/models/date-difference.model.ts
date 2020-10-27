export class DateDifference {
    constructor(init?: Partial<DateDifference>) {
        Object.assign(this, init);
    }

    hours: number;
    days: number;
    months: number;
    years: number;
    diffResponseMessage: string;
}