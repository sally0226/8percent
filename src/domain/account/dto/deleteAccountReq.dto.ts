import { IsNotEmpty, IsString } from "class-validator";

export class deleteAccountReq {
	@IsString()
	@IsNotEmpty()
	password!: string;

	@IsString()
	@IsNotEmpty()
	accountNum!: string;
}
