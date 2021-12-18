import * as RandExp from "randexp";
import { define, factory } from "typeorm-seeding";
import { Account } from "../../domain/entities/account.entity";
import { History } from "../../domain/entities/history.entity";

// let id = 1;
define(History, (faker, account: Account) => {
	const type = Math.random() < 0.5;
	const amount = Math.random() * 500000;
	const historyBalance = Math.random() * 500000;
	const briefs = new RandExp(/\w{5}/).gen();

	const history = new History();
	// history.historyId = id++;
	history.type = type;
	history.amount = amount;
	history.historyBalance = historyBalance;
	history.briefs = briefs;
	history.account = account;
	return history;
});
