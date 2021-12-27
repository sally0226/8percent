import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { User } from "../entities/user.entity";
import { UserRepository } from "./user.repository";
import { AuthService } from "../auth/auth.service";
import { DuplicatedUserException } from "@root/global/exception/DuplicatedUserException";

const token = "token for test";
const mockAuthService = {
	makeToken: jest.fn((user) => {
		console.log(user);
		return token;
	})
};
const mockUserRepository = {
	findUser: jest.fn(),
	createUser: jest.fn()
};
const userInfo = {
	userId: "testid",
	password: "testpw",
	userName: "testname"
};
const newUser = new User();
newUser.userId = "testid";
newUser.password = "testpw";
newUser.userName = "testname";

describe("UserService", () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: mockUserRepository
				},
				{
					provide: AuthService,
					useValue: mockAuthService
				}
			]
		}).compile();

		service = module.get<UserService>(UserService);
	});

	describe("create 테스트", () => {
		it("create 성공", async () => {
			// given
			mockUserRepository.findUser.mockResolvedValue(null);

			// when
			const result = await service.create(userInfo);

			// then
			expect(mockUserRepository.findUser).toHaveBeenCalledWith(
				userInfo.userId
			);
			expect(result).toEqual(token);
		});
		it("create 실패 (중복된 유저)", async () => {
			// given
			mockUserRepository.findUser.mockResolvedValue(newUser);
			try {
				// when
				await service.create(userInfo);
			} catch (err) {
				// then
				expect(err).toBeInstanceOf(DuplicatedUserException);
			}
		});
	});
});
