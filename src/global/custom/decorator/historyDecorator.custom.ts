import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const SearchHistory = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const queryParam = request.query;

		console.log(queryParam);
		return queryParam;
	}
);
