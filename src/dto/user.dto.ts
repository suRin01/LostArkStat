import { Optional } from "@nestjs/common";
import { IsBoolean, IsDate, IsString } from "class-validator";

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
	@IsString()
	salt: string;
	@IsBoolean()
	is_deleted: boolean;
}

export class executionResult {
	status: number;
	data: Array<UserDTO>;
}
