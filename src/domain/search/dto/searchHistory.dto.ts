import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class searchHistoryDto {
	@IsString()
	@IsNotEmpty()
	accountNum!: string;

	@IsString()
	@IsNotEmpty()
	type!: string;

	@IsDateString()
	startDate?: Date;

	@IsDateString()
	endDate?: Date;

	@IsString()
	briefs?: string;

	@IsInt()
	minAmount?: number;

	@IsInt()
	maxAmount?: number;

	@IsString()
	after?: string;

	@IsString()
	before?: string;

	@IsInt()
	limit?: number;
}
