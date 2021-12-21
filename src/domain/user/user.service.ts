import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { DuplicatedUserException } from "../../global/exception/DuplicatedUserException";
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
		if (findUser) {
			throw new DuplicatedUserException();
		}
		const user = await this.userRepository.createUser(createUserDto);
		return this.authService.makeToken(user);
	}
}
