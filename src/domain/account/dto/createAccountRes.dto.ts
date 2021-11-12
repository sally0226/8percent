import { Account } from "src/domain/entities/account.entity";

export class CreateAccountRes {
    accountNum: string;
    balance: number;
    userId: string;
    createdAt: Date;

    constructor(entity: Account) {
        this.accountNum = entity.accountNum;
        this.balance = entity.balance;
        this.userId = entity.user.userId;
        this.createdAt = entity.createdAt;
    }
}