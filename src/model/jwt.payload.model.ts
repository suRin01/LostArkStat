import { IsNumber, IsString } from "class-validator";

export default class jwtPayload {
	@IsString()
	public readonly username: string;
	@IsString()
	public readonly sub: string;
	@IsNumber()
	public readonly idx: number;
	@IsString()
	public readonly mainCharacter: string;
	@IsString()
	public readonly guildName: string;
}
