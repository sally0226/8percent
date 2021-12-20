import { ApiProperty } from "@nestjs/swagger";
import {
	BeforeInsert,
	Column,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import * as bcrypt from "bcrypt";
import { BaseModel } from "./base/base.entity";
import { History } from "./history.entity";
import { User } from "./user.entity";
import { LackOfBalanceExcetion } from "../transaction/exception/LackOfBalanceException";

@Entity("account")
export class Account extends BaseModel {
	@PrimaryColumn("varchar", { length: 20 })
	@ApiProperty({ description: "계좌번호" })
	accountNum!: string;

	@Column("decimal", { precision: 20, scale: 2, default: 0, nullable: false })
	@ApiProperty({ description: "잔액" })
	balance!: number;

	@ManyToOne(() => User, (user) => user.account, {
		// onDelete: "CASCADE"
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
	user: User;

	@Column("varchar", { length: 200 })
	@ApiProperty({ description: "계좌 비밀번호" })
	password: string;

	@OneToMany(() => History, (history) => history.account, {
		// onDelete: "CASCADE"
		// cascade: false
	})
	history?: History[];

	@DeleteDateColumn()
	deletedAt?: Date;

	async checkPassword(inputPassword: string) {
		return await bcrypt.compare(inputPassword, this.password)
	}

	isOwner(inputUserId: string) {
		return this.user.userId === inputUserId;
	}

	deposit(income: number) {
		const balance = this.balance.toString();
		this.balance = parseFloat(balance) + income;
	}

	withdraw (income: number) {
		const balance = this.balance.toString();
		this.balance = parseFloat(balance) - income;
		if(this.balance < 0) {
			throw new LackOfBalanceExcetion()
		}
	}

}
