import { IsString } from "class-validator";

export default class JwtValidatePayload {
	@IsString()
	public userId: string;
	@IsString()
	public username: string;
}
