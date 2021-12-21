import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/global/exception/ErrorCode";

export class LackOfBalanceExcetion extends HttpException {
	constructor() {
		super(ErrorCode.LackOfBalance, HttpStatus.BAD_REQUEST);
	}
}
