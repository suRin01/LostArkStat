import { Optional } from "@nestjs/common";
import { IsDate, IsString } from "class-validator";

export class UpdateUserDTO {
	@IsString()
	@Optional()
	name: string;
	@IsString()
	@Optional()
	id: string;
	@IsString()
	@Optional()
	password: string;
	@IsString()
	@Optional()
	phoneNumber: string;
	@IsDate()
	@Optional()
	birthDate: Date;
	@IsString()
	@Optional()
	gender: string;
	@IsString()
	@Optional()
	mainCharacter: string;
}
