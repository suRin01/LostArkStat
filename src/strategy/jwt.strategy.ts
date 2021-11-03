import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

const fromAuthCookie = function () {
	return function (request) {
		let token: string = null;
		if (request && request.headers.cookie) {
			token = request.headers.cookie.split("=")[1];
			console.log(token);
		}
		return token;
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
