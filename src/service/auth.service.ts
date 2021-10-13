import { Injectable } from "@nestjs/common";
import { Mapper } from "src/mapper/mapper";
import { queryString } from "src/common/query";
import { AuthUserDto } from "src/dto/auth.dto";
import { find } from "rxjs";

@Injectable()
export class AuthService {
	constructor(private readonly mapper: Mapper) {}

	async login(user: AuthUserDto): Promise<boolean> {
		const findOne = await this.mapper.mapper(queryString.findOne, [
			user.id_field,
		]);

		console.log(findOne.data["password"]);

		if (
			findOne.data.length !== 0 &&
			findOne.data[0]["password"] === user.password_field
		) {
			return true;
		} else {
			return false;
		}
	}
	// async getUser(id: string): Promise<executionResult> {
	// 	return await this.mapper.mapper(queryString.findOne, [id]);
	// }

	// async createUser(user: createUserDTO): Promise<executionResult> {
	// 	return await this.mapper.mapper(queryString.createOne, [
	// 		user.name,
	// 		user.id,
	// 		user.password,
	// 		user.phoneNumber,
	// 		dateParser.dbDateFormatter(user.birthDate),
	// 		user.gender,
	// 		user.mainCharacter,
	// 	]);
	// }

	// async updateUser(user: UpdateUserDTO): Promise<executionResult> {
	// 	return await this.mapper.mapper(queryString.updateOne, [
	// 		user.name,
	// 		user.id,
	// 		user.password,
	// 	]);
	// }

	// async deleteUser(userID: string): Promise<executionResult> {
	// 	return this.mapper.mapper(queryString.deleteOne, [userID]);
	// }
}
