import { HttpException } from "@nestjs/common";
import { ErrorCode } from "../../../common/ErrorCode";

export class SearchAmountException extends HttpException {
	constructor() {
		super(ErrorCode.SearchAmount, ErrorCode.SearchAmount.StatusCode);
	}
}
