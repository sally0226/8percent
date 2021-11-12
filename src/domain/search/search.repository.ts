import { EntityRepository, Repository } from "typeorm";
import { Account } from "../entities/account.entity";
import { History } from "../entities/history.entity";
import { buildPaginator } from "typeorm-cursor-pagination";

export enum typeOptions {
	deposit = "deposit",
	withdraw = "withdraw",
	all = "all"
}

interface PagingResult<Entity> {
	data: Entity[];
	cursor: Cursor;
}

interface Cursor {
	beforeCursor: string | null;
	afterCursor: string | null;
}

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
	private cursorDecode(cursor: string) {
		console.log("beforeCursor", "afterCursor");
		const columns = Buffer.from(cursor, "base64").toString();
		console.log(columns);
		const [key, raw] = columns.split(":");
		return parseInt(raw);
	}

	async getHistory(query) {
		const historyQuery = await this.createQueryBuilder("h").innerJoin(
			Account,
			"a",
			"a.accountNum = h.accountNum"
		);

		if (query.type === typeOptions.deposit)
			historyQuery.where("h.type = TRUE");
		if (query.type === typeOptions.withdraw)
			historyQuery.where("h.type = FALSE");
		if (query.type === typeOptions.all)
			historyQuery.where("h.type = TRUE OR h.type = FALSE");

		if (query.after != undefined) {
			historyQuery.andWhere("h.historyId < :historyId", {
				historyId: this.cursorDecode(query.after)
			});
		}

		if (query.before != undefined) {
			historyQuery.andWhere("h.historyId > :historyId", {
				historyId: this.cursorDecode(query.before)
			});
		}

		historyQuery.andWhere("h.accountNum = :accountNum", {
			accountNum: query.accountNum
		});

		if (query.startDate != undefined && query.endDate != undefined)
			historyQuery.andWhere(
				"h.createdAt BETWEEN :startDate AND :endDate",
				{
					startDate: query.startDate,
					endDate: query.endDate
				}
			);

		if (query.briefs != undefined)
			historyQuery.andWhere("h.briefs = :briefs", {
				briefs: query.briefs
			});

		if (query.minAmount != 0 && query.maxAmount != 0)
			historyQuery.andWhere(
				"h.createdAt BETWEEN :minAmount AND :maxAmount",
				{
					minAmount: query.minAmount,
					maxAmount: query.maxAmount
				}
			);

		if (query.after === undefined && query.before === undefined) {
			const paginator = buildPaginator({
				entity: History,
				alias: "h",
				paginationKeys: ["historyId"],
				query: {
					limit: query.limit,
					order: "DESC"
				}
			});

			const { data, cursor } = await paginator.paginate(historyQuery);
			console.log(data, cursor);
			return { data, cursor };
		}

		if (query.after != undefined) {
			const nextPaginator = buildPaginator({
				entity: History,
				alias: "h",
				paginationKeys: ["historyId"],
				query: {
					limit: query.limit,
					order: "DESC",
					afterCursor: query.after
				}
			});
			const { data, cursor } = await nextPaginator.paginate(historyQuery);
			return { data, cursor };
		}

		if (query.before != undefined) {
			const prevPaginator = buildPaginator({
				entity: History,
				alias: "h",
				paginationKeys: ["historyId"],
				query: {
					limit: query.limit,
					order: "DESC",
					beforeCursor: query.before
				}
			});

			const { data, cursor } = await prevPaginator.paginate(historyQuery);
			return { data, cursor };
		}

		return null;
	}
}
