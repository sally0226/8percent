import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	Query,
	Request,
	UseGuards,
	UseInterceptors
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SearchHistory } from "src/global/custom/decorator/historyDecorator.custom";
import { JwtGuard } from "../auth/guards/jwtGuard.guard";
import { SearchService } from "./search.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("history")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@UseGuards(JwtGuard)
	@Get()
	@ApiOperation({
		summary: "입/출금 내역 조회 API",
		description: "입/출금 내역을 조회합니다."
	})
	async history(@Request() req: any, @SearchHistory() query: any) {
		return this.searchService.history(req.user, query);
	}
}
