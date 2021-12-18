import {
	Controller,
	Req,
	UseGuards,
	Post,
	Delete,
	Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LikeService } from "src/service/like.service";
import { RequestUtility } from "src/util/req.util";

@Controller("api/like")
export class LikeController {
	constructor(private readonly likeService: LikeService) {}
	@Post("/:postId")
	@UseGuards(AuthGuard("jwt"))
	appendLike(
		@Req() req,
		@Param("postId") postId: Record<string, string>,
	): void {
		const cookie = RequestUtility.fromAuthCookie()(req);
		const userId = RequestUtility.parseJwt(cookie);

		console.debug(postId);

		this.likeService.appendLike(Number(postId), Number(userId["sub"]));
	}

	@Delete("/:postId")
	@UseGuards(AuthGuard("jwt"))
	deleteLike(@Req() req, @Param("postId") postId: number): void {
		const cookie = RequestUtility.fromAuthCookie()(req);
		const userId = RequestUtility.parseJwt(cookie);

		this.likeService.deleteLike(Number(postId), Number(userId["sub"]));
	}
}
