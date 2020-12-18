export class FieldErrors {
    constructor(init?: Partial<FieldErrors>) {
        Object.assign(this, init);
    }

    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: {
        [title: string]: string[];
    }
}

export class DefaultErrors {
    constructor(init?: Partial<DefaultErrors>) {
        Object.assign(this, init);
    }

    message: string;
}