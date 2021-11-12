import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/account.entity";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
	async createOne(userId: string, password: string, accountNum: string): Promise<Account> {
		const created = this.create({
			user: { userId },
			accountNum,
			password
		});
		return this.save(created);
	}

	async isExisted(accountNum: string): Promise<number> {
		return await this.createQueryBuilder("account")
			.select("*")
			.where("account.accountNum =:accountNum", { accountNum })
			.getCount();
	}

	async getOne(accountNum: string): Promise<Account> {
		return await this.createQueryBuilder("account")
			.select(["account.password", "user.userId"])
			.leftJoin("account.user", "user")
			.where("account.accountNum =:accountNum", { accountNum })
			.getOne();
	}

	async deleteOne(accountNum: string): Promise<void> {
		await this.softDelete({ accountNum });
	}
}
