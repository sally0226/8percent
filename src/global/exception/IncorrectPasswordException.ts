import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/global/exception/ErrorCode";

export class IncorrectPasswordException extends HttpException {
	constructor() {
		super(ErrorCode.IncorrectPassword, HttpStatus.UNAUTHORIZED);
	}
}
