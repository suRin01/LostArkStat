import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { queryString } from "../common/query";
import { UserServcie } from "./user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private readonly mapper: Mapper,
		private readonly jwtService: JwtService,
	) {}

	async validate(userid: string, userpw: string): Promise<any> {
		const findOne = await this.mapper.mapper(queryString.findOne, [userid]);

		if (
			findOne.data.length !== 0 &&
			findOne.data[0]["password"] === userpw
		) {
			return findOne;
		} else {
			return false;
		}
	}

	async login(user: any) {
		const payload = { useranme: user.username, sub: user.userId };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
