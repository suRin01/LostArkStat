import { IsOptional, IsString } from "class-validator";
import { LikeUser } from "src/dto/likeUser.dto";

export class PostObject {
	@IsString()
	public readonly _id: string;
	public readonly content: string;
	public readonly createAt: Date;
	public readonly updatedAt: Date;
	public readonly User: User;
	public readonly Images: string[];
	public readonly Like: LikeUser[];
	public readonly Comment: number;
}

class User {
	public readonly _id: number;
	public readonly name?: string;
	public readonly Image?: ImageObject;
}

export class ImageObject {
	@IsOptional()
	public readonly _id?: string;
	public readonly path: string;
	public readonly post_id?: string;
}

