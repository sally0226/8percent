import { Injectable } from "@nestjs/common";
import { AccountRepository } from "./account.repository";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { CreateAccountRes } from "./dto/createAccountRes.dto";

@Injectable()
export class AccountService {
	constructor(private accountRepository: AccountRepository) {}

	async create(user: JwtPayload, password: string): Promise<CreateAccountRes> {
		const hashed = await this.hash(password);
		return new CreateAccountRes(
			await this.accountRepository.createOne(
				user.userId,
				hashed,
				await this.createAccountNumber()
			)
		);
	}

	async delete(user: JwtPayload, accountNum: string, password: string): Promise<void> {
		const account = await this.accountRepository.getOne(accountNum);
		if (!account) {
			throw new Error();
		}
		this.isOwner(account, user);
		this.isCorrectPassword(account, password);
		await this.accountRepository.delete(accountNum);
	}

	private hash(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
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

    private isOwner(account, user) {
        if (account.user.userId !== user.userId) {
            throw new Error();
        }
	}

    private isCorrectPassword(account, password) {
        if (!bcrypt.compare(password, account.password)) {
			throw new Error();
		}
    }
}
