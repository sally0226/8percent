import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundAccountException } from "@root/global/exception/NotFoundAccountException";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

const mockService = {
	history: jest.fn()
};

describe("SearchController", () => {
	let controller: SearchController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SearchController],
			providers: [
				{
					provide: SearchService,
					useValue: mockService
				}
			]
		}).compile();

		controller = module.get<SearchController>(SearchController);
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

	describe("SearchController history 테스트", () => {
		it("SearchController history 테스트 (성공)", async () => {
			// given
			mockService.history.mockResolvedValue(res);

			// when
			const result = await controller.history(user, query);

			// then
			expect(mockService.history).toHaveBeenCalledTimes(1);
			expect(mockService.history).toHaveBeenCalledWith(user, query);
			expect(result).toEqual(res);
		});

		it("SearchController history 테스트 (NotFoundAccountException)", async () => {
			// given
			mockService.history.mockResolvedValue(
				new NotFoundAccountException()
			);

			// when
			const result = await controller.history(user, query);

			// then
			expect(mockService.history).toHaveBeenCalledWith(user, query);
			expect(result).toEqual(new NotFoundAccountException());
		});
	});
});
