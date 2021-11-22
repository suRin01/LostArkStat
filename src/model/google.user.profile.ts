import { IsBoolean, IsOptional, IsString } from "class-validator";

export class profile{
	constructor(){
		this.id = "";
		this.email = "";
		this.family_name = "";
		this.given_name = "";
		this.name = "";
		this.picture = "";
		this.verified_email = false;
		this.locale = "";
	}
	@IsString()
    readonly id: string;
	@IsString()
    readonly email: string;
	@IsBoolean()
    readonly verified_email: boolean;
	@IsString()
    readonly name: string;
	@IsOptional()
	@IsString()
    readonly given_name:  string;
	@IsOptional()
	@IsString()
    readonly family_name: string;
	@IsOptional()
	@IsString()
    readonly picture: string;
	@IsString()
    readonly locale: string;
  }