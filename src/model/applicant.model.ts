import { IsString } from "class-validator";

export class Applicant {
	@IsString()
	readonly applicantClass: string;
	@IsString()
	readonly applicantId: string;
}
