import { IsString, IsNotEmpty } from "class-validator";

export class TokenVerificationDto {
	@IsString()
	@IsNotEmpty()
	readonly token: string;
}

export default TokenVerificationDto;
