import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

const fromAuthCookie = ()=>{
	return (request): string=>{
		let accessToken: string = null;
		if (request && request.headers.cookie) {
			const cookies = request.headers.cookie.split("; ").reduce((prev, current) => {
				const [name, ...value] = current.split('=');
				prev[name] = value.join('=');
				return prev;
			  }, {});
			  accessToken = cookies["Authorization"];
		};
		console.debug(accessToken);
		return accessToken;
	};
};


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: fromAuthCookie(),
			ignoreExpiration: false,
			secretOrKey: process.env.ACCESSJWTSECRET,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	}
}
