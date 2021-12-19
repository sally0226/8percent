import { HttpException } from "@nestjs/common";
import { ErrorCode } from "../../../common/ErrorCode";

export class SearchDateException extends HttpException {
	constructor() {
		super(ErrorCode.SearchDate, ErrorCode.SearchDate.StatusCode);
	}
}
