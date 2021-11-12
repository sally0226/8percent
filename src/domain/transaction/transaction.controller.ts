import { Body, Controller, Request, Post, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guards/jwtGuard.guard";
import { TranscationDto } from "./dto/transaction.dto";
import { TransactionService } from "./transaction.service";

@Controller()
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post("deposit")
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: "입금 API", description: "입금, 입금 내역 확인" })
	async deposit(@Request() req, @Body() transactionDto: TranscationDto) {
		const loginUser = req.user;
		return await this.transactionService.deposit(loginUser, transactionDto);
	}

	@Post("withdraw")
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: "출금 API", description: "출금, 출금 내역 확인" })
	async withdraw(@Request() req, @Body() transactionDto: TranscationDto) {
		const loginUser = req.user;
		return await this.transactionService.withdraw(
			loginUser,
			transactionDto
		);
	}
}
