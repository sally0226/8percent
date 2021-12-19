import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Account } from "./account.entity";
import { BaseModel } from "./base/base.entity";
import * as bcrypt from "bcrypt";

@Entity("user")
export class User extends BaseModel {
	@PrimaryColumn("varchar", { length: 10 })
	@ApiProperty({ description: "ID" })
	userId!: string;

	@Column("varchar", { length: 200, nullable: false })
	@ApiProperty({ description: "비밀번호" })
	password!: string;

	@Column("varchar", { length: 40, nullable: false })
	@ApiProperty({ description: "이름" })
	userName!: string;

	@OneToMany(() => Account, (account) => account.user, {
		// onDelete: "CASCADE"
		// cascade: false
	})
	account?: Account[];

	static mock(userId, password, userName) {
		const fake = new User()
		fake.userId = userId;
		fake.password = password;
		fake.userName = userName;
		return fake;
	}
}
