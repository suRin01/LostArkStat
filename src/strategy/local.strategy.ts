import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { StatusCode } from "../common/statusCode";
import { ExecutionResult } from "../dto/executionResult.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<ExecutionResult> {
		const result: ExecutionResult = await this.authService.validate(username, password);
		if (result.status === StatusCode.unauthorlized) {
			throw new UnauthorizedException();
		}
		return result;
	}
}
