import { Test, TestingModule } from "@nestjs/testing";
import { AccountRepository } from "../account/account.repository";
import { NotFoundAccountException } from "../account/exception/NotFoundAccountException";
import { HistoryRepository } from "./search.repository";
import { SearchService } from "./search.service";

const mockHistoryRepository = {
	getHistory: jest.fn()
};

const mockAccountRepository = {
	getOne: jest.fn()
};

describe("SearchService", () => {
	let service: SearchService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SearchService,
				{
					provide: HistoryRepository,
					useValue: mockHistoryRepository
				},
				{
					provide: AccountRepository,
					useValue: mockAccountRepository
				}
			]
		}).compile();

		service = module.get<SearchService>(SearchService);
	});

	const user = {
		userId: "test",
		userName: "테스트"
	};

	const query = {
		accountNum: "104804 - 55 - 188702",
		type: "deposit"
	};

	const res = {
		historyId: 1,
		type: true,
		amount: 1000,
		historyBalance: 11000,
		briefs: "테스트",
		createdAt: "2021-11-12 11:01:25.699090"
	};

	const cursor = {
		afterCursor: "afterTest",
		beforeCursor: "beforeTest"
	};

	const data = {
		res,
		cursor
	};

	const accountInfo = {
		user: { userId: "test" },
		balance: 11000,
		accountNum: "104804 - 55 - 188702",
		password: "testPw"
	};

	describe("SearchService getHistory 테스트", () => {
		it("SearchService getHistory 테스트 (성공)", async () => {
			// given
			mockHistoryRepository.getHistory.mockResolvedValue(data);
			mockAccountRepository.getOne.mockResolvedValue(accountInfo);

			// when
			const result = await service.history(user, query);

			// then
			expect(mockAccountRepository.getOne).toHaveBeenCalledTimes(1);
			expect(mockHistoryRepository.getHistory).toHaveBeenCalledTimes(1);
			expect(mockAccountRepository.getOne).toHaveBeenCalledWith(
				query.accountNum
			);
			expect(mockHistoryRepository.getHistory).toHaveBeenCalledWith(
				query
			);
			expect(result).toEqual(data);
		});

		it("SearchService getHistory 테스트 (성공)", async () => {
			// given
			try {
				mockHistoryRepository.getHistory.mockResolvedValue(data);
				mockAccountRepository.getOne.mockResolvedValue(null);

				// when
				const result = await service.history(user, query);
			} catch (error) {
				// then
				expect(error).toBeInstanceOf(NotFoundAccountException);
			}
		});
	});
});
