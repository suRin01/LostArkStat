import { IsBoolean, IsNumber, IsString } from "class-validator";

export default class User {
	@IsNumber()
	public id: number;
	@IsString()
	public email: string;
	@IsString()
	public phoneNumber?: string;
	@IsString()
	public name: string;
	@IsString()
	public password?: string;
	@IsBoolean()
	public isRegisteredWithGoogle: boolean;
	@IsString()
	public currentHashedRefreshToken?: string;
	@IsBoolean()
	public isEmailConfirmed: boolean;
}
