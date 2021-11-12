import { Inject, Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/account.entity";
import { User } from "../entities/user.entity";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

    async createOne(user, password, accountNum): Promise<Account> {
        const result = await this.create({ accountNum, password });
        return this.save(result);
    }

    async get(accountNum): Promise<Account> {
        const result = await this.findOne({ accountNum });
        return result;
    }
}