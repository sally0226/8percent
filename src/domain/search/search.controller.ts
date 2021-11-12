import { Controller, Get, Query, Request } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SearchService } from "./search.service";

@Controller("")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get("history")
	@ApiOperation({
		summary: "입/출금 내역 조회 API",
		description: "입/출금 내역을 조회합니다."
	})
	async history(
		@Request() req: any,
		@Query("accountNum") accountNum: string,
		@Query("type") type: string,
		@Query("startDate") startDate: string,
		@Query("endDate") endDate: string,
		@Query("briefs") briefs: string,
		@Query("minAmount") minAmount: number,
		@Query("maxAmount") maxAmount: number,
		@Query("pageNum") pageNum: number
	) {
		if (isNaN(minAmount)) minAmount = 0;
		if (isNaN(maxAmount)) maxAmount = 0;

		console.log(
			accountNum,
			type,
			startDate,
			endDate,
			briefs,
			minAmount,
			maxAmount,
			pageNum
		);

		return this.searchService.history(
			req.user,
			accountNum,
			type,
			startDate,
			endDate,
			briefs,
			minAmount,
			maxAmount,
			pageNum
		);
	}
}
