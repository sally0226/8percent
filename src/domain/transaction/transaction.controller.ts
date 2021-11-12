import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { TranscationDto } from "./dto/transaction.dto";
import { TransactionService } from "./transaction.service";

@Controller()
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post("deposit")
	@ApiOperation({ summary: "입금 API", description: "입금, 입금 내역 확인" })
	async deposit(@Body() transactionDto: TranscationDto) {
		return await this.transactionService.deposit(transactionDto);
	}

	@Post("withdraw")
	@ApiOperation({ summary: "출금 API", description: "출금, 출금 내역 확인" })
	async withdraw(@Body() transactionDto: TranscationDto) {
		return await this.transactionService.withdraw(transactionDto);
	}
}
