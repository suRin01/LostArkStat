import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../service/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<any> {
		const result: any = await this.authService.validate(username, password);
		if (!result) {
			throw new UnauthorizedException();
		}
		return result;
	}
}
