import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../account/account.repository";
import { Account } from "../entities/account.entity";
import { History } from "../entities/history.entity";
import { TranscationDto } from "./dto/transaction.dto";
import { TransactionRepository } from "./transaction.repository";

@Injectable()
export class TransactionService {
	constructor(
		private readonly transactionRepository: TransactionRepository,
		private readonly accountRepository: AccountRepository
	) {}

	async deposit(transactionDto: TranscationDto) {
		const result = this.accountRepository.updateBalance(
			transactionDto.accountNum,
			transactionDto.money
		);
		// console.log((await result).account, (await result).balance);
		// const account = this.accountRepository.get(transactionDto.accountNum);

		return this.transactionRepository.transaction(
			await result,
			transactionDto
		);
	}

	async withdraw(transactionDto: TranscationDto) {
		const result = this.accountRepository.updateBalance(
			transactionDto.accountNum,
			-1 * transactionDto.money
		);

		return this.transactionRepository.transaction(
			await result,
			transactionDto
		);
	}
}
