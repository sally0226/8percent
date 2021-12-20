import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "../../../global/common/ErrorCode";

export class WrongPasswordException extends HttpException {
	constructor() {
		super(ErrorCode.LackOfBalance, HttpStatus.UNAUTHORIZED);
	}
}
