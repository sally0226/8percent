import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TranscationDto {
	@IsString()
	@IsNotEmpty()
	accountNum!: string;

	@IsString()
	@IsNotEmpty()
	password!: string;

	@IsNumber()
	@IsNotEmpty()
	money!: number;

	@IsString()
	@IsNotEmpty()
	briefs!: string;
}
