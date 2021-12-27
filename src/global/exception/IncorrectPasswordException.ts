import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./ErrorCode";

export class IncorrectPasswordException extends HttpException {
	constructor() {
		super(ErrorCode.IncorrectPassword, HttpStatus.UNAUTHORIZED);
	}
}
