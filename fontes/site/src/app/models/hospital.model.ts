
export class HospitalList {
    constructor(init?: Partial<HospitalList>) {
        Object.assign(this, init);
    }

    states: Hospital[] = [];
}

export class Hospital {
    constructor(init?: Partial<Hospital>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    type: string;
    state: string;
    plans: HospitalPlan[] = [];
    unities: HospitalUnity[] = [];
}

export class HospitalPlan {
    constructor(init?: Partial<HospitalPlan>) {
        Object.assign(this, init);
    }

    id: number;
    plan: string;
    included: boolean = false;
}

export class HospitalUnity {
    constructor(init?: Partial<HospitalUnity>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    type: string;
    plans: HospitalPlan[] = [];
}