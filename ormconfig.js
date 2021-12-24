/* eslint-disable @typescript-eslint/no-var-requires */
// To configure the path to your seeds and factories change the TypeORM config file (ormconfig.js or ormconfig.json).
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = [
	{
		name: "default",
		type: "sqlite",
		database: "test.db",
		synchronize: true,
		entities: ["src/domain/entities/**/*{.ts,.js}"], //[User, Account, History],
		factories: ["src/seeding/factory/**/*{.ts,.js}"],
		seeds: ["src/seeding/seeds/**/*{.ts,.js}"]
	}
	// {
	// 	name: "memory",
	// 	type: "sqlite",
	// 	database: ":memory:",
	// 	entities: ["sample/entities/**/*{.ts,.js}"],
	// 	factories: ["sample/factories/**/*{.ts,.js}"],
	// 	seeds: ["sample/seeds/**/*{.ts,.js}"]
	// }
];
