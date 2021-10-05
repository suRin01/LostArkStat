import { Injectable } from "@nestjs/common";
import { Mapper } from "src/mapper/mapper";
import { queryString } from "src/common/query";
import { executionResult } from "src/dto/user.dto";

@Injectable()
export class UserServcie {
	constructor(private readonly mapper: Mapper) {}
	async getUser(id: string): Promise<executionResult> {
		return await this.mapper.mapper(queryString.findOne, [id]);
	}
	// createUser(user:User): boolean{
	// 	console.log(user.id);
	// 	return true;
	// }
}
