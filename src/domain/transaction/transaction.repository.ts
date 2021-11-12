import { EntityRepository, Repository } from "typeorm";
import { History } from "../entities/history.entity";
import { TranscationDto } from "./dto/transaction.dto";

@EntityRepository(History)
export class TransactionRepository extends Repository<History> {
	async transaction(result, transactionDto: TranscationDto) {
		// 거래 내역
		const history: History = new History();
		history.type = true;
		history.amount = transactionDto.money;
		history.historyBalance = result.balance;
		history.account = result;
		history.briefs = transactionDto.briefs;

		return await this.save(history);
	}
}
