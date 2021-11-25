import { IsString } from "class-validator";

export default class jwtPayload {
	@IsString()
	public username: string;
	@IsString()
	public sub: string;
}
