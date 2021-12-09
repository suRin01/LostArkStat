import { PickType } from "@nestjs/mapped-types";
import { PostDTO } from "./post.dto";

export class CreatePostDTO extends PickType(PostDTO, [
	"user_id",
	"content",
] as const) {}
