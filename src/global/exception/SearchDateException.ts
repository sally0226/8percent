import { HttpException } from "@nestjs/common";
import { ErrorCode } from "./ErrorCode";

export class SearchDateException extends HttpException {
	constructor() {
		super(ErrorCode.SearchDate, ErrorCode.SearchDate.StatusCode);
	}
}
