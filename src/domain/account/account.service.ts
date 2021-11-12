import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import * as bcrypt from 'bcrypt';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountService {
    constructor(private accountRepository: AccountRepository) {}
    
    async create(user, password: string): Promise<Account> {
        const hashed = await this.hash(password);
        return await this.accountRepository
            .createOne(user, hashed, await this.createAccountNumber());
    }

    private hash(password: string) {
        return bcrypt.hash(password,10);
    }

    async createAccountNumber() {
        const accountNumber = this.inputHyphen(this.makeRandom());

        return await this.checkAccountNumber(accountNumber)
                ? this.createAccountNumber()
                : accountNumber
    }

    private inputHyphen(number) {
        return number.replace(/(\d{6})(\d{2})(\d{6})/, '$1-$2-$3')
    }

    private makeRandom() {
        return Math.random().toString(10).substr(2,14);
    }

    async checkAccountNumber(number) {
        return await this.accountRepository.get(number);
    }
}
