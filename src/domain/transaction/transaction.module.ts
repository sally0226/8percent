import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountRepository } from "../account/account.repository";
import { AuthModule } from "../auth/auth.module";
import { User } from "../entities/user.entity";
import { UserRepository } from "../user/user.repository";
import { TransactionController } from "./transaction.controller";
import { TransactionRepository } from "./transaction.repository";
import { TransactionService } from "./transaction.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User,
			UserRepository,
			TransactionRepository,
			AccountRepository
		]),
		AuthModule
	],
	controllers: [TransactionController],
	providers: [TransactionService]
})
export class TransactionModule {}
