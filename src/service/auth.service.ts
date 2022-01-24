import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { userQueryString } from "../common/query";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import jwtPayload from "../model/jwt.payload.model";
import JwtToken from "../model/jwt.token.model";
import { StatusCode } from "../common/statusCode";
import { ExecutionResult } from "../dto/executionResult.dto";
import { UserDTO } from "../dto/user.dto";
import { UserServcie } from "./user.service";

@Injectable()
export class AuthService {
	constructor(private readonly mapper: Mapper, private readonly jwtService: JwtService, private readonly userService: UserServcie) {}

	async validate(userid: string, userpw: string): Promise<ExecutionResult> {
		// const findOne: ExecutionResult = await this.mapper.mapper(userQueryString.findOne, [userid]);
		const findOne: ExecutionResult = await this.userService.getUser(userid);
		
		const data:UserDTO[] = findOne.data as UserDTO[];
		if (
			data.length !== 0 &&
			(await bcrypt.compare(userpw, data[0].password)) &&
			data[0].is_deleted != true
		) {
			return findOne;
		} else {
			return { status: StatusCode.unauthorlized, data: [] };
		}
	}

	getAccessToken(user: jwtPayload): JwtToken {
		return {
			Authorization: this.jwtService.sign(user, {
				secret: process.env.ACCESSJWTSECRET,
				expiresIn: "1d",
			}),
			Refresh: this.jwtService.sign(user, {
				secret: process.env.REFRESHJWTSECRET,
				expiresIn: "7d",
			}),
		};
	}
}
