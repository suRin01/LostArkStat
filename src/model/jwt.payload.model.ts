import { IsString } from "class-validator";

export default class jwtPayload {
	@IsString()
	public readonly username: string;
	@IsString()
	public readonly sub: string;
}
