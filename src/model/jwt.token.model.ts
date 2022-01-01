import { IsString } from "class-validator";

export default class JwtToken {
	@IsString()
	public Authorization: string;
	@IsString()
	public Refresh: string;
}
