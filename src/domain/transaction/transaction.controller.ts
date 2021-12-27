import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "../auth/guards/jwtGuard.guard";
import { ParamUser } from "../auth/user.decorator";
import { TranscationDto } from "./dto/transaction.dto";
import { TransactionService } from "./transaction.service";


@UseGuards(JwtGuard)
@Controller()
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post("deposit")
	@ApiOperation({ summary: "입금 API", description: "입금, 입금 내역 확인" })
	async deposit(@ParamUser() user, @Body() transactionDto: TranscationDto) {
		return await this.transactionService.deposit(user, transactionDto);
	}

	@Post("withdraw")
	@ApiOperation({ summary: "출금 API", description: "출금, 출금 내역 확인" })
	async withdraw(@ParamUser() user, @Body() transactionDto: TranscationDto) {
		return await this.transactionService.withdraw(
			user,
			transactionDto
		);
	}
}
