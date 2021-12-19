import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountRepository } from "../account/account.repository";
import { AuthModule } from "../auth/auth.module";
import { Account } from "../entities/account.entity";
import { History } from "../entities/history.entity";
import { SearchController } from "./search.controller";
import { HistoryRepository } from "./search.repository";
import { SearchService } from "./search.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			History,
			Account,
			HistoryRepository,
			AccountRepository
		]),
		AuthModule
	],
	controllers: [SearchController],
	providers: [SearchService]
})
export class SearchModule {}
