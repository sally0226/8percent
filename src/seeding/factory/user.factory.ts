import { define } from "typeorm-seeding";
import * as RandExp from "randexp";
import { User } from "@root/domain/entities/user.entity";

define(User, () => {
	const id = new RandExp(/\w{4}/).gen();
	const password = new RandExp(/\w{4}/).gen();
	const name = new RandExp(/\w{4}/).gen();

	const user = new User();
	user.userId = id;
	user.password = password;
	user.userName = name;
	return user;
});
