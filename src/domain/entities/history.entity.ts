import { ApiProperty } from "@nestjs/swagger";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn
} from "typeorm";
import { Account } from "./account.entity";

@Entity("history")
export class History {
	@PrimaryGeneratedColumn("increment")
	@ApiProperty({ description: "내역 ID" })
	historyId!: number;

	@Column("boolean", { default: false, nullable: false })
	@ApiProperty({ description: "입/출금" })
	type!: boolean;

	@Column("decimal", { precision: 20, scale: 2, default: 0, nullable: false })
	@ApiProperty({ description: "사용 금액" })
	amount!: number;

	@Column("decimal", { precision: 20, scale: 2, default: 0, nullable: false })
	@ApiProperty({ description: "거래후 잔액" })
	historyBalance!: number;

	@Column("varchar", { length: 10, nullable: false })
	@ApiProperty({ description: "적요" })
	briefs!: string;

	@ManyToOne(() => Account, (account) => account.history, {
		// onDelete: "CASCADE"
	})
	@JoinColumn([{ name: "accountNum", referencedColumnName: "accountNum" }])
	account: Account;

	@CreateDateColumn()
	createdAt!: Date;
}
