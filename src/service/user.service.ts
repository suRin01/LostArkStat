import { Injectable, Next } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { queryString } from "../common/query";
import { executionResult } from "../dto/user.dto";
import { dateParser } from "../util/dateParser";
import { createUserDTO } from "../dto/createUser.dto";
import { UpdateUserDTO } from "../dto/updateUser.dto";
import * as bcrypt from 'bcrypt';

import { GaxiosResponse } from "gaxios";
import { oauth2_v2 } from "googleapis";

@Injectable()
export class UserServcie {
	constructor(private readonly mapper: Mapper) {}

	async getUser(id: string): Promise<executionResult> {
		return await this.mapper.mapper(queryString.findOne, [id]);
	}

	async createUser(user: createUserDTO): Promise<executionResult> {
		const saltRound:number = 10;

		const salt: string = await bcrypt.genSalt(saltRound);
		const hashedPassword:string = await bcrypt.hash(user.password, salt);
		return await this.mapper.mapper(queryString.createOne, [
			user.name,
			user.id,
			hashedPassword,
			user.phoneNumber,
			dateParser.dbDateFormatter(user.birthDate),
			user.gender,
			user.mainCharacter,
			salt,
			user.email
		]);

	}

	async updateUser(user: UpdateUserDTO): Promise<executionResult> {
		return await this.mapper.mapper(queryString.updateOne, [user.name, user.id, user.password]);
	}

	async deleteUser(userID: string): Promise<executionResult> {
		return this.mapper.mapper(queryString.deleteOne, [userID]);
	}

	async createOauthUser(userProfile: oauth2_v2.Schema$Userinfo){
		return this.mapper.mapper(queryString.createOautOne, [userProfile.name, userProfile.id, userProfile.email, "1"])
	}

}
