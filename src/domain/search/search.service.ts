import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../account/account.repository";
import { NotFoundAccountException } from "../account/exception/NotFoundAccountException";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { searchHistoryDto } from "./dto/searchHistory.dto";
import { HistoryRepository } from "./search.repository";
@Injectable()
export class SearchService {
	constructor(
		private readonly historyRepository: HistoryRepository,
		private readonly accountRepository: AccountRepository
	) {}
	async history(user: JwtPayload, query: searchHistoryDto) {
		const account = await this.accountRepository.getOne(query.accountNum);

		if (!account || (await account).user.userId != user.userId) {
			throw new NotFoundAccountException();
		}
		return this.historyRepository.getHistory(query);
	}
}
