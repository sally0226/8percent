import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: "userId" });
	}

	async validate(userId: string, password: string) {
		const user = this.authService.validateUser(userId, password);
		if (!user) {
			return null;
		}
		return user;
	}
}
