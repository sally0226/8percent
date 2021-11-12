import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/account.entity";
import { LackOfBalanceExcetion } from "../transaction/exception/lackOfBalanceException";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
	async createOne(
		userId: string,
		password: string,
		accountNum: string
	): Promise<Account> {
		const created = this.create({
			user: { userId },
			accountNum,
			password
		});
		return this.save(created);
	}

	async updateBalance(accountNum, money: number) {
		// 계좌 잔액
		const account = await this.getOne(accountNum);
		const balance = Math.floor(account.balance) + money;
		if (balance < 0) {
			console.log("잔액부족");
			account.balance = balance;
			throw new LackOfBalanceExcetion();
		}

		// await this.update({ accountNum: accountNum }, balance);
		await this.createQueryBuilder()
			.update()
			.set({ balance: balance })
			.where("accountNum = :accountNum ", { accountNum: accountNum })
			.execute();
		account.balance = balance;
		return { balance, account };
	}

	async isExisted(accountNum: string): Promise<number> {
		return await this.createQueryBuilder("account")
			.select("*")
			.where("account.accountNum =:accountNum", { accountNum })
			.getCount();
	}

	async getOne(accountNum: string): Promise<Account> {
		return await this.createQueryBuilder("account")
			.select(["account.password", "user.userId", "account.balance"])
			.leftJoin("account.user", "user")
			.where("account.accountNum =:accountNum", { accountNum })
			.getOne();
	}

	async deleteOne(accountNum: string): Promise<void> {
		await this.softDelete({ accountNum });
	}
}
