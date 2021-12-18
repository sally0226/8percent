import { Account } from "../../domain/entities/account.entity";
import { User } from "../../domain/entities/user.entity";
import { History } from "../../domain/entities/history.entity";
import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";

export default class CreateData implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const users = await factory(User)().createMany(2);
		for (let i = 0; i < users.length; i++) {
			const accounts = await factory(Account)(users[i]).createMany(2);
			for (let j = 0; j < accounts.length; j++) {
				await factory(History)(accounts[j]).createMany(3);
			}
		}
	}
}
