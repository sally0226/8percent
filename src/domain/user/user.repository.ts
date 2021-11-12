import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/createUser.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async findUser(userId: string) {
		return await this.findOne({ userId });
	}

	async createUser(createUserDto: CreateUserDto) {
		const newUser = new User();
		newUser.userId = createUserDto.userId;
		newUser.password = await bcrypt.hash(createUserDto.password, 10);
		newUser.userName = createUserDto.userName;

		return await this.save(newUser);
	}
}
