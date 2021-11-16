import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

const fromAuthCookie = function () {
	return function (request) {
		let accessToken: string = null;
		if (request && request.headers.cookie) {
			const tokens: string[] = request.headers.cookie.split(";");
			accessToken = tokens[0].split("=")[1].trim();
		}
		return accessToken;
	};
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: fromAuthCookie(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTSECRET,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	}
}
