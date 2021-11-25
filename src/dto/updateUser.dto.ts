import { Optional } from "@nestjs/common";
import { IsDate, IsString } from "class-validator";

export class UpdateUserDTO {
	@IsString()
	@Optional()
	readonly name: string;
	@IsString()
	@Optional()
	readonly id: string;
	@IsString()
	@Optional()
	readonly password: string;
	@IsString()
	@Optional()
	readonly phoneNumber: string;
	@IsDate()
	@Optional()
	readonly birthDate: Date;
	@IsString()
	@Optional()
	readonly gender: string;
	@IsString()
	@Optional()
	readonly mainCharacter: string;
}
