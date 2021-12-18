import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CommentDTO {
	@IsNumber()
	public readonly _id?: number;
	@IsString()
	public readonly user_id: string;
	@IsNumber()
	public readonly post_id: number;
	@IsOptional()
	@IsNumber()
	public readonly parent_id?: number | null;
	@IsString()
	public readonly content: string;
	@IsDate()
	public readonly created_at?: Date;

	@IsOptional()
	@IsString()
	public readonly username?: string;

	@IsOptional()
	@IsString()
	public readonly profile_image?: string;
}
