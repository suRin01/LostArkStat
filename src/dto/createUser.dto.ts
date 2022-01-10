import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class createUserDTO {
	@IsString()
	readonly name: string;
	@IsString()
	readonly id: string;
	@IsString()
	readonly password: string;
	@IsString()
	readonly phoneNumber: string;
	@IsEmail()
	@Optional()
	readonly email: string;

	@IsDate()
	@Type(() => Date)
	readonly birthDate: Date;
	@IsString()
	readonly gender: string;
	@IsString()
	readonly mainCharacter: string;
}
