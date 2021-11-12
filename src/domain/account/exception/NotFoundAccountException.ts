import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "../../../global/common/ErrorCode";

export class NotFoundAccountException extends HttpException {
	constructor() {
		super(ErrorCode.NotFoundAccount, HttpStatus.NOT_FOUND);
	}
}
