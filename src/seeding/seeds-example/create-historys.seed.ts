import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { History } from "@root/domain/entities/history.entity";

export default class CreateHistorys implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(History)().createMany(1);
	}
}
