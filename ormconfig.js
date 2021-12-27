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
