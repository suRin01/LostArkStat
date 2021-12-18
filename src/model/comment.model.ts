import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	ValidateIf,
} from "class-validator";

export default class CommentData {
	@IsOptional()
	@IsNumber()
	public readonly _id?: number;
	@IsNumber()
	public readonly postId: number;
	@IsString()
	public readonly content: string;
	@IsOptional()
	@IsNumber()
	public readonly parentId?: number;
	@IsOptional()
	@IsDate()
	public readonly createdAt?: Date;

	public readonly User?: User;
}

class User {
	public readonly _id?: string;
	public readonly name?: string;
	public readonly Image?: ImageObject;
}

class ImageObject {
	@IsOptional()
	public readonly _id?: string;
	public readonly path: string;
}
