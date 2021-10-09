import { Optional } from "@nestjs/common";
import { IsDate, IsString } from "class-validator";

export class UserDTO {
	@IsString()
	idx: number;
	@IsString()
	name: string;
	@IsString()
	id: string;
	@IsString()
	password: string;
	@IsString()
	phoneNumber: string;
	@IsDate()
	birthDate: Date;
	@IsString()
	gender: string;
	@IsString()
	@Optional()
	mainCharacter: string;
	@IsDate()
	timestamp: Date;
}

export class executionResult {
	status: number;
	data: Array<UserDTO>;
}
