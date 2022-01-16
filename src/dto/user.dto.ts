import { Optional } from "@nestjs/common";
import { IsBoolean, IsDate, IsString } from "class-validator";

export class UserDTO {
	@IsString()
	readonly user_idx: number;
	@IsString()
	readonly name: string;
	@IsString()
	readonly id: string;
	@IsString()
	readonly password: string;
	@IsString()
	readonly email: string;
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
	readonly createdAt: Date;
	@IsString()
	readonly salt: string;
	@IsBoolean()
	readonly is_deleted: boolean;
	@IsString()
	readonly guildName: string;
}

