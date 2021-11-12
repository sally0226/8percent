import { Account } from "../../domain/entities/account.entity";
import { User } from "../../domain/entities/user.entity";
import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { History } from "../../domain/entities/history.entity";

export default class CreateData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const result = await factory(History)()
			.map(async (history: History) => {
				const user = await factory(User)().create();
				const account = await factory(Account)().create();

				account.user = user;
				history.account = account;
				return history;
			})
			.createMany(3);

		console.log(result[0].account.user);
	}
}

// const account = await factory(Account)().create();
// 		const historys = await factory(History)()
// 			.map(async (history: History) => {
// 				history.account = account;
// 				return history;
// 			})
// 			.createMany(1000000);

// const users = await factory(User)().createMany(2);
// users.forEach(async (user) => {
// 	const accounts = await factory(Account)().createMany(2);
// 	accounts.forEach(async (account) => {
// 		const historys = await factory(History)().createMany(2);
// 		historys.forEach((history) => {
// 			history.account = account;
// 		});
// 		account.history = historys;
// 		account.user = user;
// 	});
// 	user.account = accounts;
// });
// await factory(User)()
// 	.map(async (user: User) => {
// 		const accounts = await factory(Account)()
// 			.map(async (account: Account) => {
// 				const historys = await factory(History)()
// 					.map(async (history: History) => {
// 						history.account = account;
// 						return history;
// 					})
// 					.createMany(2);
// 				//account.history = historys;
// 				account.user = user;
// 				return account;
// 			})
// 			.createMany(3);
// 		//user.account = accounts;
// 		return user;
// 	})
// 	.createMany(2);
