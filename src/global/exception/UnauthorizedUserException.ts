import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/global/exception/ErrorCode";

export class UnauthorizedUserException extends HttpException {
	constructor() {
		super(ErrorCode.UnauthorizedUser, HttpStatus.NOT_FOUND);
	}
}
