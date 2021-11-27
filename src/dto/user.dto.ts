import { Optional } from "@nestjs/common";
import { IsBoolean, IsDate, IsString } from "class-validator";

export class UserDTO {
	@IsString()
	readonly idx: number;
	@IsString()
	readonly name: string;
	@IsString()
	readonly id: string;
	@IsString()
	readonly password: string;
	@IsString()
	readonly phoneNumber: string;
	@IsDate()
	readonly birthDate: Date;
	@IsString()
	readonly gender: string;
	@IsString()
	@Optional()
	readonly mainCharacter: string;
	@IsDate()
	readonly timestamp: Date;
	@IsString()
	readonly salt: string;
	@IsBoolean()
	readonly is_deleted: boolean;
}

export class executionResult {
	readonly status: number;
	readonly data: Array<UserDTO>;
}
