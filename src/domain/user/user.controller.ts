import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guards/localAuthGuard.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {}

	@Post("signup")
	async signUp(@Body() body: CreateUserDto) {
		return { token: await this.userService.create(body) };
	}

	@UseGuards(LocalAuthGuard)
	@Post("signin")
	async signIn(@Request() req) {
		return { token: await this.authService.makeToken(req.user) };
	}
}
