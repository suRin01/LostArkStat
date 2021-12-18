import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { userQueryString } from "../common/query";
import { JwtService } from "@nestjs/jwt";
import { executionResult } from "src/dto/user.dto";
import * as bcrypt from "bcrypt";
import jwtPayload from "src/model/jwt.payload.model";
import JwtToken from "src/model/jwt.token.model";
import { StatusCode } from "src/common/statusCode";

@Injectable()
export class AuthService {
	constructor(private readonly mapper: Mapper, private readonly jwtService: JwtService) {}

	async validate(userid: string, userpw: string): Promise<executionResult> {
		const findOne: executionResult = await this.mapper.mapper(userQueryString.findOne, [userid]);

		if (
			findOne.data.length !== 0 &&
			(await bcrypt.compare(userpw, findOne.data[0].password)) &&
			findOne.data[0].is_deleted != true
		) {
			return findOne;
		} else {
			return { status: StatusCode.unauthorlized, data: [] };
		}
	}

	getAccessToken(user: jwtPayload): JwtToken {
		const payload = { useranme: user.username, sub: user.sub };

		return {
			access_token: this.jwtService.sign(payload, {
				secret: process.env.ACCESSJWTSECRET,
				expiresIn: "5m",
			}),
			refresh_token: this.jwtService.sign(payload, {
				secret: process.env.REFRESHJWTSECRET,
				expiresIn: "7d",
			}),
		};
	}
}
