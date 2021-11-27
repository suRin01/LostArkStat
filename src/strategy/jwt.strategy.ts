import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import jwtPayload from "src/model/jwt.payload.model";
import JwtValidatePayload from "src/model/jwt.validate.model";
import { RequestUtility } from "src/util/req.util";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: RequestUtility.fromAuthCookie(),
			ignoreExpiration: false,
			secretOrKey: process.env.ACCESSJWTSECRET,
		});
	}

	validate(payload: jwtPayload): JwtValidatePayload {
		return { userId: payload.sub, username: payload.username };
	}
}
