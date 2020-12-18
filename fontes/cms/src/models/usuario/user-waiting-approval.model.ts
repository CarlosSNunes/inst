export class UserWaitingApprovalModel {
    constructor(init?: Partial<UserWaitingApprovalModel>) {
        Object.assign(this, init);
    }

    code: number;
    message: string;
}