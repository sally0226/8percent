import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { SearchHistory } from "../../global/decorator/historyDecorator.custom";
import { JwtPayload } from "../auth/dto/jwtPayload.dto";
import { JwtGuard } from "../auth/guards/jwtGuard.guard";
import { ParamUser } from "../auth/user.decorator";
import { searchHistoryDto } from "./dto/searchHistory.dto";
import { SearchService } from "./search.service";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtGuard)
@Controller("history")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get()
	@ApiOperation({
		summary: "입/출금 내역 조회 API",
		description: "입/출금 내역을 조회합니다."
	})
	@UsePipes(new ValidationPipe({ transform: true }))
	async history(
		@ParamUser() user: JwtPayload,
		@SearchHistory() query: searchHistoryDto
	) {
		return this.searchService.history(user, query);
	}
}
