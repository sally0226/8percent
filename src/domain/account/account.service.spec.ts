import { ForbiddenException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Account } from "../entities/account.entity";
import { User } from "../entities/user.entity";
import { AccountRepository } from "./account.repository";
import { AccountService } from "./account.service";
import { IncorrectPasswordException } from "./exception/IncorrectPasswordException";
import { NotFoundAccountException } from "./exception/NotFoundAccountException";

const mockRepository = {
	createOne: jest.fn(async (userId, password, accountNum) => {
		const result = new Account();
		result.user = new User();
		result.user.userId = userId;
		result.accountNum = accountNum;
		result.password = password;
		return Promise.resolve(result);
	}),
	getOne: jest.fn(),
	isExisted: jest.fn(),
	deleteOne: jest.fn()
};
const user = {
	userId: "test",
	userName: "test"
};

const account = new Account();
account.accountNum = "213535-53-135132";
account.password = "1344";
account.user = new User();
account.user.userId = "test";

describe("Account Service", () => {
	let service: AccountService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccountService,
				{
					provide: AccountRepository,
					useValue: mockRepository
				}
			]
		}).compile();

		service = module.get<AccountService>(AccountService);
	});

	describe("계좌 생성 테스트", () => {
		it("계좌번호를 자동으로 생성 성공", async () => {
      const user = User.mock("userId", "password", "홍길동");
      const accountPassword = "1234";
      
			const account = await service.create(user, accountPassword);

			const accountReg = /(\d{6})-(\d{2})-(\d{6})/;
			expect(account.accountNum).toMatch(accountReg);
		});
	});

	describe("계좌 삭제 테스트", () => {
		it("계좌 삭제 성공", async () => {
			// given
			mockRepository.getOne.mockResolvedValue(account);

			// when
			await service.delete(user, account.accountNum, account.password);
			// then
			expect(mockRepository.getOne).toHaveReturned();
			expect(mockRepository.deleteOne).toHaveBeenCalled();
		});

		it("계좌 삭제 실패 (계좌 정보 없음)", async () => {
			// given
			mockRepository.getOne.mockResolvedValue(null);

			try {
				// when
				await service.delete(
					user,
					account.accountNum,
					account.password
				);
			} catch (err) {
				expect(err).toBeInstanceOf(NotFoundAccountException);
			}
		});

		it("계좌 삭제 실패 (삭제 권한 없음)", async () => {
			// given
			const stranger = {
				userId: "stranger",
				userName: "stranger"
			};

			mockRepository.getOne.mockResolvedValue(account);

			try {
				// when
				await service.delete(
					stranger,
					account.accountNum,
					account.password
				);
			} catch (err) {
				expect(err).toBeInstanceOf(ForbiddenException);
			}
		});

		it("계좌 삭제 실패 (비밀번호 오류)", async () => {
			// given
			const wrongPassword = "1111";
			mockRepository.getOne.mockResolvedValue(account);

			try {
				// when
				await service.delete(user, account.accountNum, wrongPassword);
			} catch (err) {
				expect(err).toBeInstanceOf(IncorrectPasswordException);
			}
		});
	});
});
