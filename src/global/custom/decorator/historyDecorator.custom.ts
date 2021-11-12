import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const SearchHistory = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const queryParam = request.query;

		if (isNaN(queryParam["minAmount"])) queryParam["minAmount"] = 0;
		if (isNaN(queryParam["maxAmount"])) queryParam["maxAmount"] = 0;
		if (isNaN(queryParam["limit"])) queryParam["limit"] = 10;

		queryParam["limit"] = parseInt(queryParam["limit"]);

		if (queryParam["startDate"] != null && queryParam["endDate"] != null) {
			const start = new Date(queryParam["startDate"]);
			const end = new Date(queryParam["endDate"]);
			queryParam["startDate"] = new Date(
				start.getTime() - start.getTimezoneOffset() * 60000
			).toISOString();
			queryParam["endDate"] = new Date(
				end.getTime() - end.getTimezoneOffset() * 60000
			).toISOString();
		}

		return queryParam;
	}
);
