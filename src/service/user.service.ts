import { Injectable } from "@nestjs/common";
import { Mapper } from "src/mapper/mapper";
import { queryString } from "src/common/query";
import { executionResult, UserDTO } from "src/dto/user.dto";
import { dateParser } from "src/util/dateParser";
import { createUserDTO } from "src/dto/createUser.dto";
import { UpdateUserDTO } from "src/dto/updateUser.dto";

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
		]);
	}

	async updateUser(user: UpdateUserDTO): Promise<executionResult> {
		return await this.mapper.mapper(queryString.updateOne, [
			user.name,
			user.id,
			user.password,
		]);
	}

	async deleteUser(userID: string): Promise<executionResult> {
		return this.mapper.mapper(queryString.deleteOne, [userID]);
	}
}
