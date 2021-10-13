import { IsOptional, IsString } from "class-validator";

export class AuthUserDto {
	@IsString()
	readonly id_field: string;
	@IsString()
	readonly password_field: string;
	@IsOptional()
	@IsString()
	readonly sessionID: string;
}
