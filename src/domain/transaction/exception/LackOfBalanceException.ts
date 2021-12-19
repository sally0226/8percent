import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "../../../global/common/ErrorCode";

export class LackOfBalanceExcetion extends HttpException {
	constructor() {
		super(ErrorCode.LackOfBalance, HttpStatus.BAD_REQUEST);
	}
}
