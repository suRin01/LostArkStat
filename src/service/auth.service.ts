import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { queryString } from "../common/query";
import { UserServcie } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { executionResult } from "src/dto/user.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly mapper: Mapper,
		private readonly jwtService: JwtService,
	) {}

	async validate(userid: string, userpw: string): Promise<any> {
		const findOne: executionResult = await this.mapper.mapper(
			queryString.findOne,
			[userid],
		);

		if (
			findOne.data.length !== 0 &&
			findOne.data[0]["password"] === userpw
		) {
			return findOne;
		} else {
			return false;
		}
	}

	async getAccessToken(user: any) {
		const payload = { useranme: user.username, sub: user.userId };

		return {
			access_token: this.jwtService.sign(payload, {
				secret: process.env.JWTSECRET,
				expiresIn: "5m",
			}),
			refresh_token: this.jwtService.sign(payload, {
				secret: process.env.JWTSECRET,
				expiresIn: "7d",
			}),
		};
	}
}
