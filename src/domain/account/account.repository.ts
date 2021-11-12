import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/account.entity";
import { LackOfBalanceExcetion } from "../transaction/exception/lackOfBalanceException";

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
	async createOne(userId, password, accountNum): Promise<Account> {
		const result = await this.create({
			user: { userId },
			accountNum,
			password
		});
		return this.save(result);
	}

	async get(accountNum): Promise<Account> {
		return await this.findOne({ accountNum });
	}

	async updateBalance(accountNum, money: number) {
		// 계좌 잔액
		const account = await this.get(accountNum);
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
}
