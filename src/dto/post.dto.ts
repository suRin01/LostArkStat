import { Optional } from "@nestjs/common";
import { IsDate, IsDateString, IsNumber, IsString } from "class-validator";
import { Applicant } from "src/model/applicant.model";

export class PostDTO {
	@IsNumber()
	@Optional()
	public readonly post_idx?: number;
	@IsNumber()
	public readonly user_idx: number;
	@IsDate()
	@Optional()
	public readonly created_at?: Date;
	@IsDate()
	@Optional()
	public readonly updated_at?: Date;
	@IsString()
	public readonly commander: string;
	@IsString()
	public readonly target: string;
	@IsDate()
	public readonly date: Date;
	@IsString()
	public readonly constraint: string;
	@IsString()
	public readonly comment: string;
	@IsString()
	public readonly guildName: string;

	@Optional()
	public applicants?: Applicant[];
}
