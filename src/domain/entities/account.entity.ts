import { ApiProperty } from "@nestjs/swagger";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from "typeorm";
import { BaseModel } from "./base/base.entity";
import { History } from "./history.entity";
import { User } from "./user.entity";

@Entity("account")
export class Account extends BaseModel {
	@PrimaryColumn("varchar", { length: 20 })
	@ApiProperty({ description: "계좌번호" })
	accountNum!: string;

	@Column("decimal", { precision: 20, scale: 2, default: 0, nullable: false })
	@ApiProperty({ description: "잔액" })
	balance!: number;

	@ManyToOne(() => User, (user) => user.account, {
		onDelete: "CASCADE"
	})
	@JoinColumn([{ name: "userId", referencedColumnName: "userId" }])
	user?: User;

	@OneToMany(() => History, (history) => history.account, {
		onDelete: "CASCADE"
	})
	history?: History[];
}
