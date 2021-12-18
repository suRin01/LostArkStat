import {
	IsArray,
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";
import { LikeUser } from "./likeUser.dto";

export class PostDTO {
	@IsNumber()
	public readonly _id: number;
	@IsNumber()
	public readonly user_id: number;
	@IsString()
	public readonly content: string;
	@IsDate()
	public readonly created_at: Date;
	@IsDate()
	public readonly updated_at: Date;
	@IsString()
	public readonly username: string;
	@IsString()
	public readonly isDeleted: string;
	@IsString()
	public readonly profile_image: string;

	@IsOptional()
	@IsArray()
	public Like?: LikeUser[];

	@IsOptional()
	@IsArray()
	public Images?: string[];

	@IsOptional()
	@IsNumber()
	public comments?: number;
}
