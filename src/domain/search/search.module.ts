import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "../entities/account.entity";
import { History } from "../entities/history.entity";
import { SearchController } from "./search.controller";
import { HistoryRepository } from "./search.repository";
import { SearchService } from "./search.service";

@Module({
	imports: [TypeOrmModule.forFeature([HistoryRepository, History, Account])],
	controllers: [SearchController],
	providers: [SearchService]
})
export class SearchModule {}
