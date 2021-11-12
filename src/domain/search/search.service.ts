import { Injectable } from "@nestjs/common";
import { HistoryRepository } from "./search.repository";
@Injectable()
export class SearchService {
	constructor(private readonly historyRepository: HistoryRepository) {}
	async history(
		user: any,
		accountNum: string,
		type: string,
		startDate: string,
		endDate: string,
		brief: string,
		minAmount: number,
		maxAmount: number,
		pageNum: number
	) {
		// user가 해당 계정의 주인이 맞는지 검증
		return this.historyRepository.depositHistory(
			accountNum,
			type,
			startDate,
			endDate,
			brief,
			minAmount,
			maxAmount,
			pageNum
		);
	}
}
