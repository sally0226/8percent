import { Controller, Get, Query, Request } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SearchHistory } from "src/global/custom/decorator/historyDecorator.custom";
import { SearchService } from "./search.service";

@Controller("history")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get()
	@ApiOperation({
		summary: "입/출금 내역 조회 API",
		description: "입/출금 내역을 조회합니다."
	})
	async history(@Request() req: any, @SearchHistory() query) {
		// @Query("accountNum") accountNum: string,
		// @Query("type") type: string,
		// @Query("startDate") startDate: string,
		// @Query("endDate") endDate: string,
		// @Query("briefs") briefs: string,
		// @Query("minAmount") minAmount: number,
		// @Query("maxAmount") maxAmount: number,
		// @Query("pageNum") pageNum: number

		// if (isNaN(minAmount)) minAmount = 0;
		// if (isNaN(maxAmount)) maxAmount = 0;
		// if (startDate != null && endDate != null) {
		// 	const start = new Date(startDate);
		// 	const end = new Date(endDate);
		// 	startDate = new Date(
		// 		start.getTime() - start.getTimezoneOffset() * 60000
		// 	).toISOString();
		// 	endDate = new Date(
		// 		end.getTime() - end.getTimezoneOffset() * 60000
		// 	).toISOString();
		// }

		// console.log(
		// 	accountNum,
		// 	type,
		// 	startDate,
		// 	endDate,
		// 	briefs,
		// 	minAmount,
		// 	maxAmount,
		// 	pageNum
		// );
		console.log(query);
		return null;

		// return this.searchService.history(
		// 	req.user,
		// 	accountNum,
		// 	type,
		// 	startDate,
		// 	endDate,
		// 	briefs,
		// 	minAmount,
		// 	maxAmount,
		// 	pageNum
		// );
	}
}
