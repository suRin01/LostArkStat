import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper/mapper";
import { queryString } from "../common/query";
import { executionResult } from "../dto/user.dto";
import { dateParser } from "../util/dateParser";
import { createUserDTO } from "../dto/createUser.dto";
import { UpdateUserDTO } from "../dto/updateUser.dto";

@Injectable()
export class UserServcie {
	constructor(private readonly mapper: Mapper) {}

	async getUser(id: string): Promise<executionResult> {
		return await this.mapper.mapper(queryString.findOne, [id]);
	}

	async createUser(user: createUserDTO): Promise<executionResult> {
		return await this.mapper.mapper(queryString.createOne, [
			user.name,
			user.id,
			user.password,
			user.phoneNumber,
			dateParser.dbDateFormatter(user.birthDate),
			user.gender,
			user.mainCharacter,
			this.generateString(16),
			"false",
		]);
	}

	async updateUser(user: UpdateUserDTO): Promise<executionResult> {
		return await this.mapper.mapper(queryString.updateOne, [user.name, user.id, user.password]);
	}

	async deleteUser(userID: string): Promise<executionResult> {
		return this.mapper.mapper(queryString.deleteOne, [userID]);
	}

	private generateString(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		let result = " ";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	}
}
