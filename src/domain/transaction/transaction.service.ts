import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountRepository } from "../account/account.repository";
import { UserRepository } from "../user/user.repository";
import { TranscationDto } from "./dto/transaction.dto";
import { WrongPasswordException } from "./exception/WrongPasswordException";
import { TransactionRepository } from "./transaction.repository";
import * as bcrypt from "bcrypt";
import { IncorrectPasswordException } from "../account/exception/IncorrectPasswordException";

@Injectable()
export class TransactionService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly transactionRepository: TransactionRepository,
		private readonly accountRepository: AccountRepository
	) {}

	async deposit(loginUser, transactionDto: TranscationDto) {
		if (!loginUser?.userId) throw new UnauthorizedException();
		// const accountOwner = await this.accountRepository.get(
		// 	transactionDto.accountNum
		// );
		// if (loginUser.userId != accountOwner.user.userId)
		// 	throw new UnauthorizedException();

		const password = await this.accountRepository.getOne(
			transactionDto.accountNum
		);

		if (
			!password ||
			(password &&
				!(await bcrypt.compare(
					transactionDto.password,
					password.password
				)))
		)
			throw new IncorrectPasswordException();

		const result = this.accountRepository.updateBalance(
			transactionDto.accountNum,
			transactionDto.money
		);

		return this.transactionRepository.transaction(
			await result,
			transactionDto
		);
	}

	async withdraw(loginUser, transactionDto: TranscationDto) {
		if (!loginUser?.userId) throw new UnauthorizedException();

		const password = await this.accountRepository.getOne(
			transactionDto.accountNum
		);

		if (
			!password ||
			(password &&
				!(await bcrypt.compare(
					transactionDto.password,
					password.password
				)))
		)
			throw new WrongPasswordException();
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
