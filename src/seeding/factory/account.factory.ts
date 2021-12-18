import { define } from "typeorm-seeding";
import * as RandExp from "randexp";
import { Account } from "../../domain/entities/account.entity";
import { User } from "../../domain/entities/user.entity";

define(Account, (faker, user: User) => {
	const accountNum = new RandExp(/(\d{6})-(\d{2})-(\d{6})/).gen();
	const balance = 0;
	const password = new RandExp(/\d{4}/).gen(); //faker.datatype.string(4);

	const account = new Account();
	account.accountNum = accountNum;
	account.balance = balance;
	account.password = password;
	account.user = user;
	return account;
});
