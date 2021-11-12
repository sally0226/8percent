import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../user/user.repository";
import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { UnauthorizedUserException } from "../user/exception/UnauthorizedUserException";

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	async validateUser(userId: string, password: string) {
		const user = await this.userRepository.findUser(userId);
		if (
			!user ||
			(user && !(await bcrypt.compare(password, user.password)))
		) {
			throw new UnauthorizedUserException();
		}
		return user;
	}

	makeToken(user: User) {
		const payload = { userId: user.userId, userName: user.userName };
		return this.jwtService.sign(payload);
	}
}
