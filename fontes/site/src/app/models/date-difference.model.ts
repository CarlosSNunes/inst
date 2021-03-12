export class DateDifference {
    constructor(init?: Partial<DateDifference>) {
        Object.assign(this, init);
    }

    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
    diffResponseMessage: string;
}