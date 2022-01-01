import { Type } from "class-transformer";
import { IsDate, IsDateString, IsISO8601, IsNumber, IsString } from "class-validator";

export class PostData {
	@IsString()
	readonly commander: string;
	@IsString()
	readonly from: string;
	@IsString()
	readonly to: string;
	@IsString()
	readonly raidDate: string;
	@IsString()
	readonly raidTime: string;
	@IsString()
	readonly constraint: string;
	@IsString()
	readonly comment: string;
	@IsString()
	readonly applicantClass: string;
	@IsString()
	readonly applicantId: string;

}
