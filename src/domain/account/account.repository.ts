import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/account.entity";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

    async createOne(userId, password, accountNum): Promise<Account> {

        const result = await this.create({ user: { userId }, accountNum, password });
        return this.save(result);
    }

    async get(accountNum): Promise<Account> {
        return await this.findOne({ accountNum });
    }
}