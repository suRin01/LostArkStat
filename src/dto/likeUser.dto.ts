import { IsNumber } from "class-validator";

export class LikeUser {
	@IsNumber()
	public readonly user_id: number;
}
