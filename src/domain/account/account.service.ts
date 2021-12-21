import { ForbiddenException, Injectable } from "@nestjs/common";
import { AccountRepository } from "./account.repository";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { CreateAccountRes } from "./dto/createAccountRes.dto";
import { IncorrectPasswordException } from "../../global/exception/IncorrectPasswordException";
import { NotFoundAccountException } from "src/global/exception/NotFoundAccountException";

@Injectable()
export class AccountService {
	constructor(private accountRepository: AccountRepository) {}

	async create(user: JwtPayload, password: string): Promise<CreateAccountRes> {
		return new CreateAccountRes(
			await this.accountRepository.createOne(
				user.userId,
				await this.hash(password),
				await this.createAccountNumber()
			)
		);
	}

	async delete(user: JwtPayload, accountNum: string, password: string): Promise<void> {
		const account = await this.accountRepository.getOne(accountNum);
		if (!account) {
			throw new NotFoundAccountException();
		}
		if (!await account.isOwner(user.userId)) {
			throw new ForbiddenException();
		};
		
		if (!await account.checkPassword(password)) {
			throw new IncorrectPasswordException();
		};

		await this.accountRepository.deleteOne(accountNum);
	}

	private async hash(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	private async createAccountNumber(): Promise<string> {
		const accountNumber = this.inputHyphen(this.makeRandom());

		return (await this.accountRepository.isExisted(accountNumber))
			? this.createAccountNumber()
			: accountNumber;
	}

	private inputHyphen(accountNum: string): string {
		return accountNum.replace(/(\d{6})(\d{2})(\d{6})/, "$1-$2-$3");
	}

	private makeRandom(): string {
		return Math.random().toString(10).substr(2, 14);
	}
}
