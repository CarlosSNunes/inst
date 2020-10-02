export class RouteModel {
    public constructor(init?: Partial<RouteModel>) {
        Object.assign(this, init);
    }

    route: string | Function;
    description: string;
    params: object;
}
