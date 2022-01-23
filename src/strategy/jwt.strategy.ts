import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import jwtPayload from "../model/jwt.payload.model";
import JwtValidatePayload from "../model/jwt.validate.model";
import { RequestUtility } from "../util/req.util";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: RequestUtility.getAccessToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.ACCESSJWTSECRET,
		});
	}

	validate(payload: jwtPayload): JwtValidatePayload {
		return { userId: payload.sub, username: payload.username };
	}
}
