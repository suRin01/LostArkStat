import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class Equipment {
	readonly name: string;
	readonly quality: number;
	readonly icon: string;
	readonly tier: string;
}
