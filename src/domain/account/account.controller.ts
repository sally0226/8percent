import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	HttpCode,
	Post,
	UseGuards,
	UseInterceptors
} from "@nestjs/common";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { JwtGuard } from "../auth/guards/jwtGuard.guard";
import { ParamUser } from "../auth/user.decorator";
import { AccountService } from "./account.service";
import { CreateAccountReq } from "./dto/createAccountReq.dto";
import { CreateAccountRes } from "./dto/createAccountRes.dto";
import { deleteAccountReq } from "./dto/deleteAccountReq.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("accounts")
@UseGuards(JwtGuard)
export class AccountController {
	constructor(private accountService: AccountService) {}

	@Post()
	create(@ParamUser() user: JwtPayload, @Body() body: CreateAccountReq): Promise<CreateAccountRes> {
		return this.accountService.create(user, body.password);
	}

	@Delete()
    @HttpCode(204)
	async delete(@ParamUser() user: JwtPayload, @Body() body: deleteAccountReq): Promise<void> {
		await this.accountService.delete(
			user,
			body.accountNum,
			body.password
		);
	}
}
