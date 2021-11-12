import { Injectable } from "@nestjs/common";
import { HistoryRepository } from "./search.repository";
@Injectable()
export class SearchService {
	constructor(private readonly historyRepository: HistoryRepository) {}
	async history(user: any, query: any) {
		// user가 해당 계정의 주인이 맞는지 검증
		return this.historyRepository.depositHistory(query);
	}
}
