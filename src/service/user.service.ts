import { Injectable, Next } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { userQueryString } from "../common/query";
import { dateParser } from "../util/dateParser";
import { createUserDTO } from "../dto/createUser.dto";
import { UpdateUserDTO } from "../dto/updateUser.dto";
import * as bcrypt from "bcrypt";

import { oauth2_v2 } from "googleapis";
import { WinstonLogger } from "src/util/logger";
import { ExecutionResult } from "src/dto/executionResult.dto";

@Injectable()
export class UserServcie {
	constructor(private readonly mapper: Mapper) {}

	async getUser(id: string): Promise<ExecutionResult> {
		return await this.mapper.mapper(userQueryString.findOne, [id]);
	}

	async createUser(user: createUserDTO): Promise<ExecutionResult> {
		// eslint-disable-next-line @typescript-eslint/no-inferrable-types
		const saltRound: number = 10;

		const salt: string = await bcrypt.genSalt(saltRound);
		const hashedPassword: string = await bcrypt.hash(user.password, salt);
		WinstonLogger.getInstance().info("Create New User");
		return await this.mapper.mapper(userQueryString.createOne, [
			user.name,
			user.id,
			hashedPassword,
			user.phoneNumber,
			dateParser.dbDateFormatter(user.birthDate),
			user.gender,
			user.mainCharacter,
			salt,
			user.email,
		]);
	}

	async updateUser(user: UpdateUserDTO): Promise<ExecutionResult> {
		return await this.mapper.mapper(userQueryString.updateOne, [user.name, user.id, user.password]);
	}

	async deleteUser(userID: string): Promise<ExecutionResult> {
		return await this.mapper.mapper(userQueryString.deleteOne, [userID]);
	}

	async createOauthUser(userProfile: oauth2_v2.Schema$Userinfo): Promise<ExecutionResult> {
		return await this.mapper.mapper(userQueryString.createOautOne, [
			userProfile.name,
			userProfile.id,
			userProfile.email
		]);
	}
}
