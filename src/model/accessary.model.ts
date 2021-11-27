import { IsNumber, IsString } from "class-validator";

export class Equipment {
	@IsString()
	readonly name: string;
	@IsNumber()
	readonly quality: number;
	@IsString()
	readonly icon: string;
	@IsString()
	readonly tier: string;
}
