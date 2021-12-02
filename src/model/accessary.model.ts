import { IsNumber, IsString } from "class-validator";

export class Equipment {
	@IsString()
	public readonly name: string;
	@IsNumber()
	public readonly quality: number;
	@IsString()
	public readonly icon: string;
	@IsString()
	public readonly tier: string;
}
