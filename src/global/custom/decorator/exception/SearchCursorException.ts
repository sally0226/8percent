import { HttpException } from "@nestjs/common";
import { ErrorCode } from "../../../common/ErrorCode";

export class SearchCursorException extends HttpException {
	constructor() {
		super(ErrorCode.SearchCursor, ErrorCode.SearchCursor.StatusCode);
	}
}
