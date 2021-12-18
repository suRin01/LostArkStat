import { IsNumber, IsString } from "class-validator";

export class ImageDTO {
	@IsNumber()
	public readonly idx: number;
	@IsNumber()
	public readonly post_id: number;
	@IsString()
	public readonly path: string;
}
