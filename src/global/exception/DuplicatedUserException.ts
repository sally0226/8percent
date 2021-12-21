import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/global/exception/ErrorCode";

export class DuplicatedUserException extends HttpException {
	constructor() {
		super(ErrorCode.DuplicatedUser, HttpStatus.CONFLICT);
	}
}
