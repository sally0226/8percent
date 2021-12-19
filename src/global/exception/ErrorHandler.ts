import {
	ArgumentsHost,
	BadRequestException,
	ExceptionFilter,
	ForbiddenException,
	NotFoundException,
	UnauthorizedException
} from "@nestjs/common";
import { LackOfBalanceExcetion } from "src/domain/transaction/exception/LackOfBalanceException";
import { IncorrectPasswordException } from "src/domain/account/exception/IncorrectPasswordException";
import { NotFoundAccountException } from "src/domain/account/exception/NotFoundAccountException";
import { DuplicatedUserException } from "src/domain/user/exception/DuplicatedUserException";
import { UnauthorizedUserException } from "src/domain/user/exception/UnauthorizedUserException";
import { ErrorCode } from "../common/ErrorCode";
import { ErrorResponse } from "../common/ErrorResponse";
import { SearchCursorException } from "../custom/decorator/exception/SearchCursorException";
import { SearchAmountException } from "../custom/decorator/exception/SearchAmountException";
import { SearchDateException } from "../custom/decorator/exception/SearchDateException";

export class ExceptionHandler implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		console.log(exception);
		if (exception instanceof BadRequestException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.BadRequest));
		} else if (exception instanceof NotFoundException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.NotFound));
		} else if (exception instanceof ForbiddenException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.Forbidden));
		} else if (exception instanceof UnauthorizedException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.UnAuth));
		} else if (exception instanceof DuplicatedUserException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.DuplicatedUser));
		} else if (exception instanceof UnauthorizedUserException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.UnauthorizedUser));
		} else if (exception instanceof LackOfBalanceExcetion) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.LackOfBalance));
		} else if (exception instanceof NotFoundAccountException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.NotFoundAccount));
		} else if (exception instanceof IncorrectPasswordException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.IncorrectPassword));
		} else if (exception instanceof SearchCursorException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.SearchCursor));
		} else if (exception instanceof SearchAmountException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.SearchAmount));
		} else if (exception instanceof SearchDateException) {
			const status = exception.getStatus();
			response
				.status(status)
				.json(ErrorResponse.response(ErrorCode.SearchDate));
		} else {
			// 에러 처리가 완료되면 다른 오류로 교체해주세요.
			console.log(exception);
			response
				.status(417)
				.json(ErrorResponse.response(ErrorCode.NewError));
		}
	}
}
