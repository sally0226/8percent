import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
	constructor(
		private userRepository: UserRepository,
		private authService: AuthService
	) {}

	async create(createUserDto: CreateUserDto) {
		const findUser = await this.userRepository.findUser(
			createUserDto.userId
		);
		console.log(findUser);
		if (findUser) {
			throw new Error();
		}
		const user = await this.userRepository.createUser(createUserDto);
		console.log(user);
		return this.authService.makeToken(user);
	}
}
