import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MorganInterceptor, MorganModule } from "nest-morgan";
import { Account } from "./domain/entities/account.entity";
import { History } from "./domain/entities/history.entity";
import { User } from "./domain/entities/user.entity";

@Module({
	imports: [
		// TypeOrmModule.forRoot({
		// 	type: "sqlite",
		// 	database: ":memory:",
		// 	entities: [],
		// 	synchronize: true
		// }),
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [User, History, Account]
			// synchronize: true
		}),
		MorganModule
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: MorganInterceptor("combined")
		}
	]
})
export class AppModule {}
