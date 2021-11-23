import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { queryString } from "../common/query";
import { JwtService } from "@nestjs/jwt";
import { executionResult } from "src/dto/user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
	constructor(private readonly mapper: Mapper, private readonly jwtService: JwtService) {}

	async validate(userid: string, userpw: string): Promise<any> {
		const findOne: executionResult = await this.mapper.mapper(queryString.findOne, [userid]);
		
		const saltRound:number = 10;
		
		if (
			findOne.data.length !== 0 &&
			await bcrypt.compare(userpw, findOne.data[0]["password"]) && 
			// findOne.data[0]["password"] === hashedPassword && 
			findOne.data[0]["is_deleted"] != true
		) {
			return findOne;
		} else {
			return false;
		}
	}

	getAccessToken(user: any) {
		const payload = { useranme: user.username, sub: user.userId };

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
