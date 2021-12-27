import { Account } from "@root/domain/entities/account.entity";
import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";

export default class CreateAccounts implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(Account)().createMany(1);
	}
}
