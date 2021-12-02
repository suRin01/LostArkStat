import { IsString } from "class-validator";

export default class jwtPayload {
	@IsString()
	readonly username: string;
	@IsString()
	readonly sub: string;
}
