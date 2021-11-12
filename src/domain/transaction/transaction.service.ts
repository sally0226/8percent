import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountRepository } from "../account/account.repository";
import { UserRepository } from "../user/user.repository";
import { TranscationDto } from "./dto/transaction.dto";
import { WrongPasswordException } from "./exception/WrongPasswordException";
import { TransactionRepository } from "./transaction.repository";
import * as bcrypt from "bcrypt";
import { IncorrectPasswordException } from "../account/exception/IncorrectPasswordException";
import { ApiQuery } from "@nestjs/swagger";
import { check } from "prettier";
import { Account } from "../entities/account.entity";
import { LackOfBalanceExcetion } from "./exception/lackOfBalanceException";

@Injectable()
export class TransactionService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly transactionRepository: TransactionRepository,
		private readonly accountRepository: AccountRepository
	) {}

	async deposit(user, transactionDto: TranscationDto) {
		const { accountNum, password, money } = transactionDto;
		const account = await this.accountRepository.getOne(accountNum);

		await this.validateAccount(account, user.userId, password);

		await account.deposit(money)

		await this.accountRepository.updateBalance(account);

		return await this.transactionRepository.transaction(
			account,
			transactionDto
		);
	}

	async withdraw(user, transactionDto: TranscationDto) {
		const { accountNum, password, money, briefs } = transactionDto;
		const account = await this.accountRepository.getOne(accountNum);

		await this.validateAccount(account, user.userId, password);

		await account.withdraw(money)

		await this.accountRepository.updateBalance(account);

		return await this.transactionRepository.transaction(
			account,
			transactionDto
		);
	}

	async validateAccount(account: Account, userId: string, password: string): Promise<void> {
		if (!account.isOwner(userId)) {
			throw new UnauthorizedException();
		}

		if (!account.checkPassword(password)) {
			throw new IncorrectPasswordException();
		}
	}
}
