import { Account } from "../../domain/entities/account.entity";
import { User } from "../../domain/entities/user.entity";
import { History } from "../../domain/entities/history.entity";
import { Connection, createConnection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";

export default class CreateData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const userNum = 2;
		const accountNum = 2;
		const historyNum = 3;

		const users = await factory(User)().createMany(userNum);
		const accounts = await Promise.all(
			users.map((user) => {
				return factory(Account)(user).createMany(accountNum);
			})
		);
		const aaa = accounts.flat();
		const historys = await Promise.all(
			aaa.map((account) => {
				console.log(account);
				return factory(History)(account).createMany(historyNum);
			})
		);
		// (await factory(User)().createMany(userNum)).forEach(async (user) => {
		// 	console.log(user);
		// 	(await factory(Account)(user).createMany(accountNum)).forEach(
		// 		async (account) => {
		// 			console.log(account);
		// 			await factory(History)(account).createMany(historyNum);
		// 	});
		// });

		// const users = await factory(User)().createMany(userNum);
		// for (let i = 0; i < users.length; i++) {
		// 	const accounts = await factory(Account)(users[i]).createMany(accountNum);
		// 	for (let j = 0; j < accounts.length; j++) {
		// 		await factory(History)(accounts[j]).createMany(historyNum);
		// 	}
		// }
	}
}
