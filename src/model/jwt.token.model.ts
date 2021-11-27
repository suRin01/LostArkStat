import { IsString } from "class-validator";

export default class JwtToken {
	@IsString()
	public access_token: string;
	@IsString()
	public refresh_token: string;
}
