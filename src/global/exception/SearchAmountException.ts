import { HttpException } from "@nestjs/common";
import { ErrorCode } from "./ErrorCode";

export class SearchAmountException extends HttpException {
	constructor() {
		super(ErrorCode.SearchAmount, ErrorCode.SearchAmount.StatusCode);
	}
}
